import mongoose from "mongoose";
import User from "../models/userModel.js";
import Bus from "../models/busModel.js";
import Booking from "../models/bookingModel.js";
import { isAdmin, isPassenger } from "./userController.js";
import { bookingMail } from '../services/EmailService.js';


export const createBooking = async (req, res) => {

    if(!isPassenger(req)) {
        return res.status(403).json({
          message: "Please login as a passenger to make bookings"
        });
      }

      const parseDate = (dateStr) => {
        // Handle DD-MM-YYYY format
        if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
          const [day, month, year] = dateStr.split('-');
          return new Date(`${year}-${month}-${day}`);
        }
        // Handle ISO format (YYYY-MM-DD)
        return new Date(dateStr);
      };

  const session = await mongoose.startSession();
  session.startTransaction();
  
  try {
    const { userId, startLocation, endLocation, bookingDate, time, busId, seats, passengerName, passengerPhone,totalPrice } = req.body;

    // Validate required fields
    if (!userId || !startLocation || !endLocation || !bookingDate || !time || !busId || !seats || !passengerName || !passengerPhone || !totalPrice) {
      throw new Error('All fields are required');
    }

    // Validate user exists
    const user = await User.findById(userId).session(session);
    if (!user) throw new Error('User not found');

    // Validate bus exists
    const bus = await Bus.findById(busId).session(session);
    if (!bus) throw new Error('Bus not found');

    // Validate bus schedule
    const schedule = bus.schedule.find(s => {
        const dbDate = parseDate(s.date);
        const inputDate = parseDate(bookingDate);
        return dbDate.getTime() === inputDate.getTime();
      });
  
      if (!schedule) throw new Error('Bus not available on selected date');
    
    const timeSlot = schedule.times.find(t => t.startTime === time);
    if (!timeSlot) throw new Error('Bus not available at selected time');

    // Validate seat availability
    const existingBookings = await Booking.find({
      busId,
      bookingDate,
      time
    }).session(session);

    const bookedSeats = existingBookings.flatMap(booking => booking.seats);
    const conflictingSeats = seats.filter(seat => bookedSeats.includes(seat));

    if (conflictingSeats.length > 0) {
      throw new Error(`Seats ${conflictingSeats.join(', ')} are already booked`);
    }

    // Validate seat count
    if (seats.length > parseInt(bus.noOfSeats)) {
      throw new Error('Selected seats exceed bus capacity');
    }

    // Create booking
    const newBooking = new Booking({
      userId,
      startLocation,
      endLocation,
      bookingDate,
      time,
      busId,
      seats,
      passengerName,
      passengerPhone,
      totalPrice
    });

    await newBooking.save({ session });
    await bookingMail(user.email, {
    customerName: passengerName,
          bookingId: newBooking._id,
          location: `${startLocation} → ${endLocation}`,
          bookingDate,
          bookingTime: time,
          seatNumbers: seats.join(", "),
          amount: `Rs. ${totalPrice}`,
          bookingLink: `${process.env.CLIENT_URL}/ticket/${newBooking._id}`,
          supportPhone: process.env.SUPPORT_PHONE || "011-1234567",
          supportEmail: process.env.SUPPORT_EMAIL || "support@sfservice.lk",
          companyName: "Staff Bus Service.lk",
          companyAddress: "Colombo, Sri Lanka"
});
    await session.commitTransaction();
    res.status(201).json(newBooking);
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ error: error.message });
  } finally {
    session.endSession();
  }
};





export const getBookedSeats = async (req, res) => {
  try {
    const { busId, bookingDate, time } = req.query;
    
    const bookings = await Booking.find({
      busId,
      bookingDate,
      time
    });

    const bookedSeats = bookings.flatMap(booking => booking.seats);
    res.json({ bookedSeats });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};




export async function getBookings(req, res) {
  try {
    if (isPassenger(req)) {
      
      const bookings = await Booking.find({ userId: req.user._id });
      res.json(bookings);
      return;
    } else if (isAdmin(req)) {
      const bookings = await Booking.find({});
      res.json(bookings);
      return;
    } else {
      res.json({
        message: "Please login to view bookings"
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
}


export async function deleteBooking(req, res)  {
  try {
    const booking = await Booking.findById(req.params.id);
    
    // Check if within 2 hours
    const departure = new Date(`${booking.bookingDate}T${booking.time}`);
    if ((departure - new Date()) <= 2 * 60 * 60 * 1000) {
      return res.status(400).json({ 
        error: "Cannot cancel within 2 hours of departure" 
      });
    }

    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
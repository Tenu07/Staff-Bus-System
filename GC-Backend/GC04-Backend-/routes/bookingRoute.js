import express from "express";
import { createBooking, deleteBooking, getBookedSeats, getBookings } from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getBookedSeats);
bookingRouter.get("/getbookings", getBookings);
bookingRouter.delete("/:id", deleteBooking);

export default bookingRouter;
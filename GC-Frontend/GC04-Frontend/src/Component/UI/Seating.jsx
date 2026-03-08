// frontend/src/components/Seating.js
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const seatStatuses = {
  available: "bg-emerald-400 text-white cursor-pointer",
  booked: "bg-gray-300 text-gray-500 cursor-not-allowed opacity-70",
  notProvided: "bg-amber-50 border border-amber-200 text-amber-700",
};

const config = { reservedFee: 50 };

const Seating = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatStatusMap, setSeatStatusMap] = useState({});
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [loadingSeats, setLoadingSeats] = useState(true);
  const containerRef = useRef(null);
  const seatsRef = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();
  const { bus, selectedDate, selectedTime, endTime } = location.state || {};

  useEffect(() => {
    if (!bus || !selectedDate || !selectedTime) return;

    const fetchBookedSeats = async () => {
      try {
        const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/bookings", {
          params: {
            busId: bus._id,
            bookingDate: selectedDate,
            time: selectedTime
          }
        });

        const bookedSeats = response.data.bookedSeats;
        const seatLayout = generateSeatLayout().flat();
        
        const bookedSeatNumbers = bookedSeats.map(label => {
          const seat = seatLayout.find(s => s.label === label);
          return seat ? seat.num : null;
        }).filter(Boolean);

        const statusMap = {};
        for (let i = 1; i <= bus.noOfSeats; i++) {
          statusMap[i] = bookedSeatNumbers.includes(i) ? 'booked' : 'available';
        }
        
        setSeatStatusMap(statusMap);
        setLoadingSeats(false);

      } catch (error) {
        console.error('Error fetching seat availability:', error);
        setLoadingSeats(false);
      }
    };

    fetchBookedSeats();
  }, [bus, selectedDate, selectedTime]);

  const generateSeatLayout = () => {
    if (!bus) return [];
    const layout = [];
    let seatNumber = 1;
    let rowNumber = 1;

    while (seatNumber <= bus.noOfSeats) {
      const seatsInRow = Math.min(4, bus.noOfSeats - seatNumber + 1);
      const rowSeats = [];
      
      for (let i = 0; i < seatsInRow; i++) {
        const label = `${rowNumber}${String.fromCharCode(65 + i)}`;
        rowSeats.push({ num: seatNumber, label });
        seatNumber++;
      }
      
      layout.push(rowSeats);
      rowNumber++;
    }

    return layout;
  };

  const handleSeatClick = (seatNum) => {
    if (seatStatusMap[seatNum] === "booked" || loadingSeats) return;

    const seatElement = seatsRef.current[seatNum - 1];
    if (seatElement) {
      gsap.to(seatElement, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      });
    }

    setSelectedSeats(prev => 
      prev.includes(seatNum) 
        ? prev.filter(s => s !== seatNum) 
        : prev.length < 4 ? [...prev, seatNum] : prev
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleProceedToPayment = () => {
    if (!bus || selectedSeats.length === 0 || !formData.name || !formData.phone) return;

    const seatLabels = selectedSeats.map(seatNum => 
      generateSeatLayout()
        .flat()
        .find(seat => seat.num === seatNum)?.label || seatNum
    );

    navigate("/payment", {
      state: {
        bookingDetails: {
          selectedSeats: seatLabels,
          passengerName: formData.name,
          passengerPhone: formData.phone,
          bookingDate: selectedDate,
          departureTime: selectedTime,
          arrivalTime: endTime,
          routeNumber: bus.routeNo,
          busId: bus._id,
          seatPrice: bus.price,
          totalPrice: selectedSeats.length * bus.price + config.reservedFee * 2,
          busType: bus.busType,
          startLocation: bus.startLocation,
          endLocation: bus.endLocation,
          reservationFee: config.reservedFee * 2
        }
      }
    });
  };

  const seatLayout = generateSeatLayout();
  const total = selectedSeats.length * (bus?.price || 0) + config.reservedFee * 2;

  if (!bus) return <div className="p-6 text-center">Loading bus details...</div>;

  return (
    <div ref={containerRef} className="bg-gray-100 p-6 min-h-screen font-poppins">
      <div className="mx-auto max-w-5xl grid grid-cols-1 lg:grid-cols-5 gap-6 bg-white p-6 rounded-xl shadow-lg">
        {/* Header Section */}
        <div className="lg:col-span-5 header-content">
          <h1 className="text-xl font-semibold text-black">Express Bus Reservation</h1>
          <div className="flex flex-col gap-3 text-sm text-gray-600 mt-1">
            <span>{bus.startLocation} to {bus.endLocation} • {selectedDate}</span>
            <span>{selectedTime} to {endTime}</span>
          </div>
          <div className="flex gap-3 text-sm text-gray-600 mt-1">
            <span>{bus.routeNo}</span>
            <span>{bus.noOfSeats} Seats</span>
            <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">{bus.busType}</span>
            <span className="hidden">{bus._id}</span>
          </div>
        </div>

        {/* Seat Selection Section */}
        <div className="lg:col-span-3">
          <h2 className="text-md font-semibold text-gray-700 mb-3">Select Your Seats</h2>

          {loadingSeats ? (
            <div className="text-center py-4 text-gray-500">
              <div className="animate-pulse">Loading seat availability...</div>
            </div>
          ) : (
            <>
              <div className="flex gap-4 mb-4 text-xs seat-legend">
                {Object.entries(seatStatuses).map(([status, classes]) => (
                  <div key={status} className="flex items-center">
                    <div className={`w-4 h-4 rounded ${classes.split(" ")[0]}`}></div>
                    <span className="ml-1 capitalize text-gray-600">{status}</span>
                  </div>
                ))}
              </div>

              <div className="relative bg-gray-50 rounded-lg p-6 shadow-sm">
                <div className="text-xs text-center text-gray-500 bg-gray-200 w-24 mx-auto mb-6 py-1 rounded-full">Bus Front</div>

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <div className="w-20 h-10 bg-gray-200 rounded-md flex items-center justify-center text-xs text-gray-600 font-medium">
                        Entrance
                      </div>
                    </div>
                    <div className="w-6 h-8 bg-gray-100 rounded-sm"></div>
                    <div className="flex gap-2">
                      <div className="w-20 h-10 ml-4 bg-gray-300 rounded-md flex items-center justify-center text-xs text-gray-700 font-medium shadow">
                        Driver
                      </div>
                    </div>
                  </div>

                  {seatLayout.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex items-center gap-3">
                      <span className="w-6 text-xs text-gray-500 font-medium text-right">{rowIndex + 1}</span>
                      {rowIndex === seatLayout.length - 1 ? (
                        <div className="flex gap-2">
                          {row.map(seat => (
                            <Seat
                              key={seat.num}
                              ref={el => (seatsRef.current[seat.num - 1] = el)}
                              {...seat}
                              selected={selectedSeats.includes(seat.num)}
                              status={seatStatusMap[seat.num]}
                              onClick={handleSeatClick}
                            />
                          ))}
                        </div>
                      ) : (
                        <>
                          <div className="flex gap-2">
                            {row.slice(0, 2).map(seat => (
                              <Seat
                                key={seat.num}
                                ref={el => (seatsRef.current[seat.num - 1] = el)}
                                {...seat}
                                selected={selectedSeats.includes(seat.num)}
                                status={seatStatusMap[seat.num]}
                                onClick={handleSeatClick}
                              />
                            ))}
                          </div>
                          <div className="w-6 h-8 bg-gray-100 rounded-sm"></div>
                          <div className="flex gap-2">
                            {row.slice(2).map(seat => (
                              <Seat
                                key={seat.num}
                                ref={el => (seatsRef.current[seat.num - 1] = el)}
                                {...seat}
                                selected={selectedSeats.includes(seat.num)}
                                status={seatStatusMap[seat.num]}
                                onClick={handleSeatClick}
                              />
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Booking Form Section - Fixed visibility */}
        <div className="lg:col-span-2 bg-gray-50 p-4 rounded-lg shadow-sm">
          <h2 className="text-md font-semibold text-gray-700 mb-4">Booking Details</h2>
          <form className="space-y-4 text-sm" onSubmit={e => e.preventDefault()}>
            <div>
              <label className="block text-gray-700 mb-1 text-xs font-medium">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                required
                disabled={loadingSeats}
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1 text-xs font-medium">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter your number"
                className="w-full border border-gray-300 p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                required
                disabled={loadingSeats}
              />
            </div>
            <div className="bg-white p-3 rounded border border-gray-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700 text-xs font-medium">Selected Seats</span>
                <span className="text-xs text-gray-500">{selectedSeats.length}/4</span>
              </div>
              <div className="mb-3">
                {selectedSeats.length > 0 ? (
                  <div className="flex gap-2">
                    {selectedSeats.map(seat => (
                      <span
                        key={seat}
                        className="inline-flex items-center justify-center w-8 h-8 rounded bg-blue-100 text-blue-700 text-xs font-medium"
                      >
                        {seatLayout.flat().find(s => s.num === seat).label}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-xs text-gray-400 italic">No seats selected</span>
                )}
              </div>
              <div className="pt-2 border-t border-gray-100 text-xs">
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Tickets ({selectedSeats.length})</span>
                  <span>{bus.price * selectedSeats.length} LKR</span>
                </div>
                <div className="flex justify-between text-gray-600 mb-1">
                  <span>Reservation Fee</span>
                  <span>{config.reservedFee * 2} LKR</span>
                </div>
                <div className="flex justify-between font-semibold text-gray-800">
                  <span>Total</span>
                  <span>{total} LKR</span>
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={handleProceedToPayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg text-sm transition disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              disabled={loadingSeats || selectedSeats.length === 0 || !formData.name || !formData.phone}
            >
              {loadingSeats ? (
                <>
                  Loading Seats...
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </>
              ) : (
                <>
                  Proceed to Payment
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const Seat = React.forwardRef(({ num, label, selected, status, onClick }, ref) => (
  <div
    ref={ref}
    onClick={() => onClick(num)}
    className={`w-10 h-10 rounded-md flex items-center justify-center text-xs font-medium transition
      ${seatStatuses[status]} ${selected ? "ring-2 ring-blue-500 ring-offset-1" : ""}`}
  >
    {label}
  </div>
));

export default Seating;
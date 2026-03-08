import React from 'react';
import { useLocation } from 'react-router-dom';

function PrintBill() {
  const { state } = useLocation();
  const booking = state?.booking || {};
  const paymentMethod = state?.paymentMethod || '';
  const paymentDetails = state?.paymentDetails || {};

  if (!state?.booking) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">No Booking Found</h2>
        <p className="text-gray-600">Please complete a booking first.</p>
      </div>
    );
  }

  // Extract booking details
  const {
    _id: bookingId,
    startLocation,
    endLocation,
    bookingDate,
    time: departureTime,
    seats,
    passengerName,
    passengerPhone,
    totalPrice,
    busId,
    createdAt
  } = booking;

  // Format date and time
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const formatTime = (timeString) => {
    return new Date(`1970-01-01T${timeString}`).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Printable area */}
      <div className="print-area p-8 border-2 border-gray-200 rounded-lg">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-600">Bus Ticket</h1>
          <p className="text-gray-500">Booking Confirmation</p>
        </div>

        {/* Booking Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Journey Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium text-gray-700">Route:</span> {startLocation} to {endLocation}
              </p>
              <p>
                <span className="font-medium text-gray-700">Date:</span> {formatDate(bookingDate)}
              </p>
              <p>
                <span className="font-medium text-gray-700">Departure:</span> {formatTime(departureTime)}
              </p>
              <p>
                <span className="font-medium text-gray-700">Bus ID:</span> {busId}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Passenger Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium text-gray-700">Name:</span> {passengerName}
              </p>
              <p>
                <span className="font-medium text-gray-700">Contact:</span> {passengerPhone}
              </p>
              <p>
                <span className="font-medium text-gray-700">Booking ID:</span> {bookingId}
              </p>
              <p>
                <span className="font-medium text-gray-700">Booked on:</span> {formatDate(createdAt)}
              </p>
            </div>
          </div>
        </div>

        {/* Seats */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Seat Information</h2>
          <div className="flex flex-wrap gap-2">
            {seats.map((seat, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                Seat {seat}
              </span>
            ))}
          </div>
        </div>

        {/* Payment Info */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="font-medium text-gray-700">Payment Method:</p>
                <p className="capitalize">
                  {paymentMethod === 'card' 
                    ? `Credit Card (${paymentDetails.cardType} ****${paymentDetails.cardLastFour})`
                    : paymentDetails.method}
                </p>
              </div>
              <div>
                <p className="font-medium text-gray-700">Amount Paid:</p>
                <p className="text-green-600 font-bold">{totalPrice} LKR</p>
              </div>
            </div>
          </div>
        </div>

        {/* Fare Breakdown */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Fare Breakdown</h2>
          <div className="border rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Seat Fare ({seats.length} seats)
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    {totalPrice - 100} LKR
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    Reservation Fee
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                    100 LKR
                  </td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    Total
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 text-right">
                    {totalPrice} LKR
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t pt-6 text-center text-sm text-gray-500">
          <p>Thank you for choosing our bus service!</p>
          <p className="mt-2">For any inquiries, please contact our customer support.</p>
          <button
            onClick={() => window.print()}
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg inline-block print:hidden"
          >
            Print Ticket
          </button>
        </div>
      </div>
    </div>
  );
}

export default PrintBill;
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Visa from '../assets/Images/PaymentImages/visacard.png';
import Master from '../assets/Images/PaymentImages/mastercard.png';
import Amex from '../assets/Images/PaymentImages/amexcard.png';
import Genie from '../assets/Images/PaymentImages/genie.png';
import toast from 'react-hot-toast';

function Payment() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const bookingDetails = state?.bookingDetails || {};
  
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Form states
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvc, setCvc] = useState('');
  const [cardName, setCardName] = useState('');
  const [genieNumber, setGenieNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [genieName, setGenieName] = useState('');
  
  // Error states
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardName: '',
    genieNumber: '',
    phoneNumber: '',
    genieName: ''
  });

  // Extract booking details from passed data
  const {
    selectedSeats = [],
    passengerName = '',
    passengerPhone = '',
    bookingDate = '',
    departureTime = '',
    arrivalTime = '',
    routeNumber = '',
    seatPrice = 0,
    totalPrice = 0,
    busType = '',
    startLocation = '',
    endLocation = '',
    reservationFee = 0,
    busId = ''
  } = bookingDetails;

  // Calculate breakdown values
  const seatsTotal = selectedSeats.length * seatPrice;

  // Card number formatter and validator
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{4})(?=\d)/g, '$1 ').trim();
    setCardNumber(formattedValue);
    
    if (value.length > 0 && value.length < 16) {
      setErrors({...errors, cardNumber: 'Card number must be 16 digits'});
    } else {
      setErrors({...errors, cardNumber: ''});
    }
  };
  
  // Expiry date formatter and validator
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2);
    }
    
    setExpiryDate(value);
    
    if (value.length > 0 && value.length < 5) {
      setErrors({...errors, expiryDate: 'Enter valid date (MM/YY)'});
    } else if (value.length >= 2 && parseInt(value.slice(0, 2)) > 12) {
      setErrors({...errors, expiryDate: 'Month must be between 01-12'});
    } else {
      setErrors({...errors, expiryDate: ''});
    }
  };
  
  // CVC validator
  const handleCvcChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setCvc(value.slice(0, 3));
    
    if (value.length > 0 && value.length < 3) {
      setErrors({...errors, cvc: 'CVC must be 3 digits'});
    } else {
      setErrors({...errors, cvc: ''});
    }
  };
  
  // Handle card name change
  const handleCardNameChange = (e) => {
    setCardName(e.target.value);
    if (e.target.value.length > 0 && e.target.value.length < 3) {
      setErrors({...errors, cardName: 'Name is too short'});
    } else {
      setErrors({...errors, cardName: ''});
    }
  };
  
  // Handle Genie number change
  const handleGenieNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setGenieNumber(value);
    if (value.length > 0 && value.length < 10) {
      setErrors({...errors, genieNumber: 'Enter a valid Genie number'});
    } else {
      setErrors({...errors, genieNumber: ''});
    }
  };
  
  // Handle phone number change
  const handlePhoneNumberChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
    if (value.length > 0 && value.length < 10) {
      setErrors({...errors, phoneNumber: 'Enter a valid phone number'});
    } else {
      setErrors({...errors, phoneNumber: ''});
    }
  };
  
  // Form submission handler
  const handleSubmit = async () => {
    let isValid = true;
    const newErrors = {...errors};
    
    if (paymentMethod === 'card') {
      if (cardNumber.length < 16) {
        newErrors.cardNumber = 'Card number must be 16 digits';
        isValid = false;
      }
      if (expiryDate.length < 5) {
        newErrors.expiryDate = 'Enter valid date (MM/YY)';
        isValid = false;
      }
      if (cvc.length < 3) {
        newErrors.cvc = 'CVC must be 3 digits';
        isValid = false;
      }
      if (cardName.length < 3) {
        newErrors.cardName = 'Name is too short';
        isValid = false;
      }
    } else {
      if (genieNumber.length < 10) {
        newErrors.genieNumber = 'Enter a valid Genie number';
        isValid = false;
      }
      if (phoneNumber.length < 10) {
        newErrors.phoneNumber = 'Enter a valid phone number';
        isValid = false;
      }
      if (genieName.length < 3) {
        newErrors.genieName = 'Name is too short';
        isValid = false;
      }
    }
    
    setErrors(newErrors);
    
    if (isValid) {
      setIsLoading(true);
      
      try {
        // Get user data from localStorage
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');
        
        if (!userId || !token) {
          throw new Error('User not authenticated');
        }

        // Prepare booking data
        const bookingData = {
          userId,
          startLocation,
          endLocation,
          bookingDate,
          time: departureTime,
          busId,
          seats: selectedSeats,
          passengerName,
          passengerPhone,
          totalPrice
        };

        // Make API call to create booking
        const response = await axios.post(import.meta.env.VITE_BACKEND_URL +'/api/bookings/',
          bookingData,
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            }
          }
        );

        setIsLoading(false);
        setIsSuccess(true);
        
        // Redirect to confirmation page after 2 seconds
        setTimeout(() => {
          toast.success("payment success")
          navigate('/booking-confirmation', {
            state: {
              booking: response.data,
              paymentMethod,
              paymentDetails: paymentMethod === 'card' ? {
                cardLastFour: cardNumber.slice(-4),
                cardType: cardNumber.startsWith('4') ? 'Visa' : 
                          cardNumber.startsWith('5') ? 'Mastercard' : 'Amex'
              } : {
                method: 'Genie Pay'
              }
            }
          });
        }, 2000);
        
      } catch (error) {
        setIsLoading(false);
        toast.error("Booking Failed")
        let errorMessage = 'Booking failed. Please try again.';
        
        if (error.response) {
          errorMessage = error.response.data.message || error.response.data.error || errorMessage;
        } else if (error.request) {
          errorMessage = 'No response from server. Please check your connection.';
        } else {
          errorMessage = error.message || errorMessage;
        }
        
        alert(errorMessage);
      }
    }
  };

  if (!state?.bookingDetails) {
    return (
      <div className="max-w-6xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Invalid Booking Session</h2>
        <p className="text-gray-600">Please start your booking from the beginning.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6 bg-gray-50 font-poppins">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Complete Your Payment</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Left Section - Payment Options */}
        <div className="w-full md:w-2/3 bg-white rounded-lg shadow-lg p-8 border-t-4 border-blue-500">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">Select Payment Method</h2>
            <div className="flex gap-4 mb-6">
              <button 
                className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border transition-all duration-300 ${
                  paymentMethod === 'card' 
                    ? 'bg-blue-50 border-blue-500 shadow-md transform scale-105' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('card')}
              >
                <div className="flex items-center">
                  <div className="flex space-x-2 mr-3">
                    <img src={Visa} alt="Visa" className="h-8" />
                    <img src={Master} alt="Mastercard" className="h-8" />
                    <img src={Amex} alt="American Express" className="h-8" />
                  </div>
                  <span className="font-medium text-gray-800">Credit/Debit Card</span>
                </div>
              </button>
              
              <button 
                className={`flex-1 flex items-center justify-center px-4 py-3 rounded-lg border transition-all duration-300 ${
                  paymentMethod === 'genie' 
                    ? 'bg-blue-50 border-blue-500 shadow-md transform scale-105' 
                    : 'bg-white border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => setPaymentMethod('genie')}
              >
                <div className="flex items-center">
                  <img src={Genie} alt="Genie" className="h-8 mr-3" />
                  <span className="font-medium text-gray-800">Genie Pay</span>
                </div>
              </button>
            </div>
          </div>
          
          {paymentMethod === 'card' ? (
            <div className="space-y-6">
              <div>
                <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    id="cardNumber"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200 ${
                      errors.cardNumber ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
                    }`}
                  />
                  {cardNumber && (
                    <div className="absolute right-3 top-3">
                      {cardNumber.startsWith('4') && <img src={Visa} alt="Visa" className="h-6" />}
                      {cardNumber.startsWith('5') && <img src={Master} alt="Mastercard" className="h-6" />}
                      {cardNumber.startsWith('3') && <img src={Amex} alt="Amex" className="h-6" />}
                    </div>
                  )}
                </div>
                {errors.cardNumber && <p className="mt-1 text-sm text-red-500">{errors.cardNumber}</p>}
              </div>
              
              <div className="flex gap-6">
                <div className="w-1/2">
                  <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    id="expiryDate"
                    value={expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200 ${
                      errors.expiryDate ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
                    }`}
                  />
                  {errors.expiryDate && <p className="mt-1 text-sm text-red-500">{errors.expiryDate}</p>}
                </div>
                <div className="w-1/2">
                  <label htmlFor="cvc" className="block text-sm font-medium text-gray-700 mb-1">CVC</label>
                  <input
                    type="text"
                    id="cvc"
                    value={cvc}
                    onChange={handleCvcChange}
                    placeholder="123"
                    maxLength={3}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200 ${
                      errors.cvc ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
                    }`}
                  />
                  {errors.cvc && <p className="mt-1 text-sm text-red-500">{errors.cvc}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="cardName" className="block text-sm font-medium text-gray-700 mb-1">Name on Card</label>
                <input
                  type="text"
                  id="cardName"
                  value={cardName}
                  onChange={handleCardNameChange}
                  placeholder="John Smith"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200 ${
                    errors.cardName ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
                  }`}
                />
                {errors.cardName && <p className="mt-1 text-sm text-red-500">{errors.cardName}</p>}
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <label htmlFor="genieNumber" className="block text-sm font-medium text-gray-700 mb-1">Genie Number</label>
                <input
                  type="text"
                  id="genieNumber"
                  value={genieNumber}
                  onChange={handleGenieNumberChange}
                  placeholder="Enter your Genie number"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200 ${
                    errors.genieNumber ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
                  }`}
                />
                {errors.genieNumber && <p className="mt-1 text-sm text-red-500">{errors.genieNumber}</p>}
              </div>
              
              <div>
                <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  id="phoneNumber"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  placeholder="Enter your phone number"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200 ${
                    errors.phoneNumber ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
                  }`}
                />
                {errors.phoneNumber && <p className="mt-1 text-sm text-red-500">{errors.phoneNumber}</p>}
              </div>
              
              <div>
                <label htmlFor="genieName" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  id="genieName"
                  value={genieName}
                  onChange={(e) => {
                    setGenieName(e.target.value);
                    if (e.target.value.length > 0 && e.target.value.length < 3) {
                      setErrors({...errors, genieName: 'Name is too short'});
                    } else {
                      setErrors({...errors, genieName: ''});
                    }
                  }}
                  placeholder="Enter your name"
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none transition-colors duration-200 ${
                    errors.genieName ? 'border-red-400 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200 focus:border-blue-400'
                  }`}
                />
                {errors.genieName && <p className="mt-1 text-sm text-red-500">{errors.genieName}</p>}
              </div>
            </div>
          )}
          
          <div className="mt-8">
            <button 
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 relative overflow-hidden ${
                isSuccess 
                  ? 'bg-green-500 hover:bg-green-600' 
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              <span className={`inline-block transition-opacity duration-300 ${isLoading || isSuccess ? 'opacity-0' : 'opacity-100'}`}>
                Pay {totalPrice} LKR
              </span>
              {isLoading && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                </span>
              )}
              {isSuccess && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
              )}
            </button>
          </div>
        </div>
        
        {/* Right Section - Booking Summary */}
        <div className="w-full md:w-1/3">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 sticky top-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">Booking Summary</h2>
              <div className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {busType}
              </div>
            </div>
            
            <div className="py-4 space-y-4">
              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Route</span>
                  <span className="font-medium text-gray-800 text-right">
                    {startLocation} → {endLocation}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Passenger</span>
                  <span className="font-medium text-gray-800">{passengerName}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Contact</span>
                  <span className="font-medium text-gray-800">{passengerPhone}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Seats</span>
                  <div className="flex gap-1">
                    {selectedSeats.map((seat, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 text-xs font-medium px-2.5 py-1 rounded">
                        {seat}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Travel Date</span>
                  <span className="font-medium text-gray-800">{bookingDate}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Departure</span>
                  <span className="font-medium text-gray-800">{departureTime}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm">Arrival</span>
                  <span className="font-medium text-gray-800">{arrivalTime}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-500">Seats ({selectedSeats.length} x {seatPrice} LKR)</span>
                <span className="text-gray-800">{seatsTotal} LKR</span>
              </div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-500">Reservation Fee</span>
                <span className="text-gray-800">{reservationFee} LKR</span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex justify-between text-lg">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="font-bold text-blue-600">{totalPrice} LKR</span>
              </div>
            </div>
            
            <div className="mt-6 bg-blue-50 rounded-md p-4 text-sm text-blue-800">
              <p className="flex items-center">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clipRule="evenodd" />
                </svg>
                Your {selectedSeats.length} seat booking will be confirmed after payment
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;

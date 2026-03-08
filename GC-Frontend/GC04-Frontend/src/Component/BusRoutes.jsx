import { ArrowRightLeft, Clock, MapPin, Bus, Tag, Calendar, User, Info, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

function BusRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { buses } = location.state || {};
  const [selectedBus, setSelectedBus] = useState(null);
  const [showPolicyModal, setShowPolicyModal] = useState(false);
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [])

  const handleViewSeats = (bus, schedule, time) => {
    navigate('/seating', { 
      state: { 
        bus,
        selectedDate: schedule.date,
        selectedTime: time.startTime,
        endTime: time.endTime
      } 
    });
  };

  const handleShowPolicy = (bus) => {
    setSelectedBus(bus);
    setShowPolicyModal(true);
  };

  if (!buses) {
    return (
      <div className='flex flex-col items-center w-full min-h-screen bg-gray-50 py-20 px-4'>
        <div className='max-w-4xl w-full bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center'>
          <div className='bg-gray-100 rounded-full p-4 mb-6'>
            <Bus className='w-12 h-12 text-gray-500' />
          </div>
          <h1 className='text-2xl font-bold text-gray-700 mb-4 text-center'>
            Find Your Perfect Bus Journey
          </h1>
          <p className='text-gray-500 text-center max-w-md mb-8'>
            Please search for buses to see available routes, schedules, and pricing options.
          </p>
          <Link 
            to="/" 
            className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity'
          >
            Search Buses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col items-center w-full min-h-screen bg-gray-50 py-12 px-4 mt-12'>
      {/* Route Bar */}
      {buses.length > 0 && (
        <div className='w-full max-w-6xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-t-xl px-6 py-4 mb-6'>
          <div className='flex flex-col md:flex-row justify-between items-center'>
            <div className='flex items-center gap-4 mb-4 md:mb-0'>
              <div className='bg-white/20 p-2 rounded-full'>
                <MapPin className='w-5 h-5' />
              </div>
              <div className='flex items-center gap-3 text-lg font-medium'>
                <span>{buses[0].startLocation}</span>
                <ArrowRightLeft className='w-5 h-5' />
                <span>{buses[0].endLocation}</span>
              </div>
            </div>
            
            <div className='flex items-center gap-4'>
              <div className='flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full'>
                <Calendar className='w-4 h-4' />
                <span>{new Date().toLocaleDateString()}</span>
              </div>
              <div className='flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full'>
                <User className='w-4 h-4' />
                <span>1 Passenger</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bus Cards */}
      <div className='w-full max-w-6xl space-y-6'>
        {buses.length > 0 ? (
          buses.map((bus) => {
            const schedule = bus.schedule?.[0] || {};
            const firstTime = schedule.times?.[0] || {};

            return (
              <div 
                key={bus._id} 
                className='bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl'
              >
                <div className='flex flex-col md:flex-row h-full'>
                  {/* Left Section - Bus Info */}
                  <div className={`md:w-1/4 p-5 flex flex-col justify-between ${
                    bus.busType === "AC" ? "bg-blue-50" : "bg-green-50"
                  }`}>
                    <div>
                      <div className='flex justify-between items-start'>
                        <h2 className='font-bold text-lg text-gray-800'>{bus.busName}</h2>
                        <span className={`text-xs font-semibold px-2 py-1 rounded-full ${
                          bus.busType === "AC" 
                            ? "bg-blue-600 text-white" 
                            : "bg-green-600 text-white"
                        }`}>
                          {bus.busType}
                        </span>
                      </div>
                      
                      <div className='flex items-center gap-2 mt-4 text-gray-600'>
                        <Bus className='w-4 h-4' />
                        <span className='text-sm'>Route: {bus.routeNo}</span>
                      </div>
                    </div>
                    
                    <div className='mt-4'>
                      <div className='flex items-center gap-2 text-gray-600'>
                        <Calendar className='w-4 h-4' />
                        <span className='text-sm'>{schedule.date || 'N/A'}</span>
                      </div>
                      <div className='flex items-center gap-2 text-gray-600 mt-1'>
                        <Calendar className='w-4 h-4' />
                        <span className='text-sm'>Closing: {schedule.closingDate || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Center Section - Route Details */}
                  <div className='md:w-2/4 p-5 border-l border-r border-gray-100'>
                    <div className='flex items-center justify-between h-full'>
                      <div className='flex items-center gap-6'>
                        <div className='text-center'>
                          <div className='text-xl font-bold'>{firstTime.startTime || 'N/A'}</div>
                          <div className='text-sm text-gray-500 mt-1'>{bus.startLocation}</div>
                        </div>
                        
                        <div className='flex flex-col items-center'>
                          <div className='w-16 h-0.5 bg-gray-300'></div>
                          <div className='my-1'>
                            <Clock className='w-4 h-4 text-gray-500' />
                          </div>
                          <div className='w-16 h-0.5 bg-gray-300'></div>
                          <div className='text-xs text-gray-500 mt-1'>
                            {firstTime.duration || 'Estimated duration'}
                          </div>
                        </div>
                        
                        <div className='text-center'>
                          <div className='text-xl font-bold'>{firstTime.endTime || 'N/A'}</div>
                          <div className='text-sm text-gray-500 mt-1'>{bus.endLocation}</div>
                        </div>
                      </div>
                      
                      <button 
                        onClick={() => handleShowPolicy(bus)}
                        className='hidden md:flex items-center gap-1 text-blue-600 text-sm hover:underline'
                      >
                        <Info className='w-4 h-4' />
                        <span>Policy</span>
                      </button>
                    </div>
                    
                    <button 
                      onClick={() => handleShowPolicy(bus)}
                      className='md:hidden flex items-center gap-1 text-blue-600 text-sm mt-4'
                    >
                      <Info className='w-4 h-4' />
                      <span>View cancellation policy</span>
                    </button>
                  </div>

                  {/* Right Section - Price & Action */}
                  <div className='md:w-1/4 p-5 flex flex-col justify-between'>
                    <div className='flex flex-col items-end'>
                      <div className='text-2xl font-bold text-gray-800'>LKR {bus.price}.00</div>
                      <div className='text-sm text-gray-500 mt-1'>
                        <span className={`inline-block w-2 h-2 rounded-full mr-1 ${
                          bus.noOfSeats > 10 ? 'bg-green-500' : bus.noOfSeats > 5 ? 'bg-yellow-500' : 'bg-red-500'
                        }`}></span>
                        {bus.noOfSeats} seats available
                      </div>
                    </div>
                    
                    <button 
                      className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-all mt-4 ${
                        bus.noOfSeats > 0 
                          ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700' 
                          : 'bg-gray-400 cursor-not-allowed'
                      }`}
                      onClick={() => bus.noOfSeats > 0 && handleViewSeats(bus, schedule, firstTime)}
                      disabled={bus.noOfSeats <= 0}
                    >
                      {bus.noOfSeats > 0 ? 'View Seats' : 'Sold Out'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className='w-full bg-white rounded-xl shadow-lg p-8 flex flex-col items-center'>
            <div className='bg-gray-100 rounded-full p-4 mb-6'>
              <Bus className='w-12 h-12 text-gray-500' />
            </div>
            <h1 className='text-2xl font-bold text-gray-700 mb-4'>No Buses Available</h1>
            <p className='text-gray-500 text-center max-w-md mb-8'>
              We couldn't find any buses for your selected route and date. 
              Please try different search criteria.
            </p>
            <Link 
              to="/" 
              className='bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity'
            >
              Search Again
            </Link>
          </div>
        )}
      </div>
      
      {/* Policy Modal */}
      {showPolicyModal && selectedBus && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white p-4 border-b flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-800">Cancellation Policy</h3>
              <button 
                onClick={() => setShowPolicyModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className={`p-3 rounded-lg ${
                  selectedBus.busType === "AC" ? "bg-blue-100" : "bg-green-100"
                }`}>
                  <Bus className={`w-8 h-8 ${
                    selectedBus.busType === "AC" ? "text-blue-600" : "text-green-600"
                  }`} />
                </div>
                <div>
                  <h4 className="font-bold text-lg">{selectedBus.busName}</h4>
                  <p className="text-gray-600">Route: {selectedBus.startLocation} to {selectedBus.endLocation}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Cancellation Charges</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex justify-between">
                      <span>More than 48 hours before departure</span>
                      <span>10% of ticket price</span>
                    </li>
                    <li className="flex justify-between">
                      <span>24 to 48 hours before departure</span>
                      <span>25% of ticket price</span>
                    </li>
                    <li className="flex justify-between">
                      <span>12 to 24 hours before departure</span>
                      <span>50% of ticket price</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Less than 12 hours before departure</span>
                      <span>No refund</span>
                    </li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Rescheduling Policy</h4>
                  <p className="text-gray-600">
                    Tickets can be rescheduled up to 6 hours before departure with a 5% rescheduling fee. 
                    Rescheduling is subject to seat availability.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">No Show Policy</h4>
                  <p className="text-gray-600">
                    Passengers who fail to show up at the boarding point will not be eligible for any refund.
                  </p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button 
                  onClick={() => setShowPolicyModal(false)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-lg font-medium"
                >
                  Close Policy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default BusRoutes
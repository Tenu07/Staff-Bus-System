import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  Ticket, 
  Trash2,
  AlertCircle,
  ArrowLeft,
  Settings,
  CreditCard
} from 'lucide-react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

function ProfilePage() {
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    contactNumber: '',
    profilePhoto: null
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [activeTab, setActiveTab] = useState('bookings');

  // Fetch user data and bookings
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Fetch user data
        const userResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/user/`, 
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        const { firstName, lastName, email, contactNumber, profilepic } = userResponse.data;
        setProfileData({
          firstName: firstName || '',
          lastName: lastName || '',
          email: email || '',
          contactNumber: contactNumber || '',
          profilePhoto: profilepic || null
        });

        // Fetch bookings
        const bookingsResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/bookings/getbookings`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        
        setBookings(bookingsResponse.data);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.response?.data?.message || 'Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Calculate if booking can be cancelled (>2 hours remaining)
  const canCancelBooking = (departureDateTime) => {
    const now = new Date();
    const diffHours = (departureDateTime - now) / (1000 * 60 * 60);
    return diffHours > 2;
  };

  // Format departure date and time
  const formatDeparture = (booking) => {
    return new Date(`${booking.bookingDate}T${booking.time}`);
  };

  const handleDelete = async (bookingId) => {
    try {
      setDeletingId(bookingId);
      const booking = bookings.find(b => b._id === bookingId);
      if (!booking) {
        throw new Error('Booking not found');
      }
      const departure = formatDeparture(booking);
      if (!canCancelBooking(departure)) {
        throw new Error('Cannot cancel within 2 hours of departure');
      }
  
      await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/bookings/${bookingId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }
      );
      
      setBookings(bookings.filter(booking => booking._id !== bookingId));
      toast.success("Booking cancelled successfully");
    } catch (err) {
      console.error('Error deleting booking:', err);
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setDeletingId(null);
    }
  };

  // Format time remaining
  const formatTimeRemaining = (departure) => {
    const now = new Date();
    const diffMs = departure - now;
    const diffHours = Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60)));
    
    if (diffHours <= 0) {
      return <span className="text-red-500 font-medium">Departed</span>;
    }
    if (diffHours <= 2) {
      return <span className="text-red-500 font-medium">{diffHours}h remaining (Non-refundable)</span>;
    }
    return <span className="text-green-500 font-medium">Cancellable ({diffHours}h remaining)</span>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <h2 className="text-xl font-medium text-white">Loading your profile...</h2>
          <p className="text-gray-400 mt-2">Please wait while we fetch your information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex flex-col items-center justify-center p-4">
        <div className="max-w-md w-full bg-gray-800 rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="text-red-400" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Error Loading Data</h2>
          <p className="text-gray-300 mb-6">{error}</p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
            >
              Try Again
            </button>
            <Link 
              to="/" 
              className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black pb-16">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-900 to-blue-900 pt-6 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-start">
            <Link to="/" className="flex items-center text-white/80 hover:text-white transition-colors">
              <ArrowLeft className="mr-2" size={20} />
              <span>Back to Home</span>
            </Link>
            <button className="flex items-center text-white/80 hover:text-white transition-colors">
              <Settings className="mr-2" size={20} />
              <span>Settings</span>
            </button>
          </div>

          <div className="flex flex-col md:flex-row items-center mt-8">
            <div className="relative">
              <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white/20 bg-gray-700 flex items-center justify-center relative">
                {profileData.profilePhoto ? (
                  <img 
                    src={profileData.profilePhoto} 
                    alt="Profile" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40"></div>
              </div>
              <div className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 shadow-lg">
                <User className="text-white w-4 h-4" />
              </div>
            </div>
            
            <div className="mt-6 md:mt-0 md:ml-8 text-center md:text-left">
              <h1 className="text-3xl font-bold text-white">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-gray-300 mt-1 flex items-center justify-center md:justify-start">
                <Mail className="mr-2" size={16} />
                {profileData.email}
              </p>
              <p className="text-gray-300 mt-1 flex items-center justify-center md:justify-start">
                <Phone className="mr-2" size={16} />
                {profileData.contactNumber || 'No phone number'}
              </p>
              
              <div className="mt-4 flex flex-wrap justify-center md:justify-start gap-3">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-gray-300 text-sm">Total Bookings</p>
                  <p className="text-white font-bold text-xl">{bookings.length}</p>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                  <p className="text-gray-300 text-sm">Member Since</p>
                  <p className="text-white font-bold text-xl">2023</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-6">
        <div className="flex border-b border-gray-700">
          <button
            className={`px-4 py-3 font-medium text-sm md:text-base relative ${
              activeTab === 'bookings' 
                ? 'text-blue-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('bookings')}
          >
            My Bookings
            {activeTab === 'bookings' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
            )}
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm md:text-base relative ${
              activeTab === 'payments' 
                ? 'text-blue-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('payments')}
          >
            Payment Methods
            {activeTab === 'payments' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
            )}
          </button>
          <button
            className={`px-4 py-3 font-medium text-sm md:text-base relative ${
              activeTab === 'settings' 
                ? 'text-blue-400' 
                : 'text-gray-400 hover:text-gray-300'
            }`}
            onClick={() => setActiveTab('settings')}
          >
            Account Settings
            {activeTab === 'settings' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500"></div>
            )}
          </button>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        {activeTab === 'bookings' ? (
          <div>
            <h2 className="text-2xl font-bold text-white mb-6">Your Travel History</h2>
            
            {bookings.length === 0 ? (
              <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-12 text-center">
                <div className="w-20 h-20 mx-auto bg-gray-700 rounded-full flex items-center justify-center mb-6">
                  <Ticket className="text-gray-400" size={40} />
                </div>
                <h3 className="text-xl font-medium text-white mb-2">No bookings yet</h3>
                <p className="text-gray-400 mb-6">You haven't made any bookings yet. Start planning your next trip!</p>
                <Link 
                  to="/" 
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-lg text-white font-medium hover:from-blue-700 hover:to-indigo-800 transition-all"
                >
                  Find Buses
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {bookings.map((booking) => {
                  const departure = formatDeparture(booking);
                  const isCancellable = canCancelBooking(departure);
                  
                  return (
                    <div 
                      key={booking._id} 
                      className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-gray-700 hover:border-gray-600 transition-all"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-lg font-bold text-white flex items-center">
                              <MapPin className="text-blue-400 mr-2" size={18} />
                              {booking.startLocation} → {booking.endLocation}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                              Booking ID: <span className="font-mono">{booking._id.slice(-8)}</span>
                            </p>
                          </div>
                          <div className="bg-gray-700 px-3 py-1 rounded-full text-xs text-gray-300">
                            {formatTimeRemaining(departure)}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                          <div className="bg-gray-700/50 p-3 rounded-lg">
                            <p className="text-xs text-gray-400">Departure</p>
                            <p className="text-white font-medium">
                              <Calendar className="inline mr-2 text-blue-400" size={16} />
                              {departure.toLocaleDateString()}
                            </p>
                            <p className="text-white">
                              <Clock className="inline mr-2 text-blue-400" size={16} />
                              {departure.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </p>
                          </div>

                          <div className="bg-gray-700/50 p-3 rounded-lg">
                            <p className="text-xs text-gray-400">Details</p>
                            <p className="text-white">
                              <span className="font-medium">Seats:</span> {booking.seats.join(', ')}
                            </p>
                            <p className="text-white">
                              <span className="font-medium">Total:</span> 
                              <span className="text-yellow-400 ml-1">${booking.totalPrice}</span>
                            </p>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-gray-700 flex justify-between items-center">
                          <div>
                            <p className="text-xs text-gray-400">Bus Details</p>
                            <p className="text-white">{booking.busName} • {booking.busType}</p>
                          </div>
                          
                          {isCancellable ? (
                            <button
                              onClick={() => handleDelete(booking._id)}
                              disabled={deletingId === booking._id}
                              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                                deletingId === booking._id
                                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                                  : 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:from-red-700 hover:to-red-800'
                              }`}
                            >
                              <Trash2 size={18} />
                              <span>{deletingId === booking._id ? 'Cancelling...' : 'Cancel'}</span>
                            </button>
                          ) : (
                            <div className="flex items-center text-red-400 text-sm">
                              <AlertCircle className="mr-2" size={16} />
                              <span>Cannot cancel</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : activeTab === 'payments' ? (
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <CreditCard className="mr-3 text-blue-400" size={24} />
              Payment Methods
            </h2>
            
            <div className="bg-gray-900 rounded-xl p-5 mb-6">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center mr-4">
                    <CreditCard className="text-blue-400" size={20} />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">Visa •••• 1234</h3>
                    <p className="text-gray-400 text-sm">Expires 12/2025</p>
                  </div>
                </div>
                <button className="text-blue-400 hover:text-blue-300 text-sm">
                  Edit
                </button>
              </div>
              <div className="flex justify-between pt-4 border-t border-gray-700">
                <span className="text-gray-400">Primary method</span>
                <div className="bg-green-900/30 text-green-400 px-3 py-1 rounded-full text-xs">
                  Active
                </div>
              </div>
            </div>
            
            <button className="flex items-center text-blue-400 hover:text-blue-300">
              <CreditCard className="mr-2" size={18} />
              Add new payment method
            </button>
          </div>
        ) : (
          <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Settings className="mr-3 text-blue-400" size={24} />
              Account Settings
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="font-medium text-white mb-4">Personal Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">First Name</label>
                    <div className="bg-gray-800 rounded-lg px-4 py-3 mt-1 text-white">
                      {profileData.firstName}
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Last Name</label>
                    <div className="bg-gray-800 rounded-lg px-4 py-3 mt-1 text-white">
                      {profileData.lastName}
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Email</label>
                    <div className="bg-gray-800 rounded-lg px-4 py-3 mt-1 text-white">
                      {profileData.email}
                    </div>
                  </div>
                </div>
                <button className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium hover:from-blue-700 hover:to-indigo-800 transition-all">
                  Update Information
                </button>
              </div>
              
              <div className="bg-gray-900 rounded-xl p-6">
                <h3 className="font-medium text-white mb-4">Security</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-gray-400 text-sm">Password</label>
                    <div className="bg-gray-800 rounded-lg px-4 py-3 mt-1 text-white">
                      ••••••••••
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm">Phone Number</label>
                    <div className="bg-gray-800 rounded-lg px-4 py-3 mt-1 text-white">
                      {profileData.contactNumber || 'Not set'}
                    </div>
                  </div>
                </div>
                <button className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-medium hover:from-blue-700 hover:to-indigo-800 transition-all">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
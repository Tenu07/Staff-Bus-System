import React, { useState, useEffect } from 'react'
import Logo from '../assets/Images/logo-invert.png'
import AppleLogo from '../assets/Images/apple-store.svg'
import GooglePlay from '../assets/Images/google-play.svg'
import { User, LogOut, UserCircle, X, Menu, Home, Info, Phone, Ticket } from 'lucide-react'
import { useNavigate, NavLink } from 'react-router-dom'
import toast from 'react-hot-toast'

function Header() {
  const [showProfilePopup, setShowProfilePopup] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    toast.success("Logout successfully")
    navigate('/');
    setShowProfilePopup(false);
  };

  const navLinks = [
    { path: '/', label: 'Home'},
    { path: '/about', label: 'About Us'},
    { path: '/contact', label: 'Contact Us'},
    { path: '/booking', label: 'Book Now', primary: true },
  ];

  return (
    <div className='z-50 bg-black w-full top-0 right-0 left-0 fixed'>
      {/* Desktop Header */}
      <div className='h-[5rem] hidden md:flex items-center justify-between px-8 lg:px-20'>
        {/* Logo */}
        <NavLink to="/" className="hover:opacity-90 transition-opacity">
          <h1 className='text-white font-poppinsSemiBold text-xl'>Staff Bus Service.lk</h1>
        </NavLink>
        
        {/* Navigation Links */}
        <div className='flex items-center gap-2'>
          {navLinks.map((link, index) => (
            <NavLink
              key={index}
              to={link.path}
              className={({ isActive }) => 
                `px-4 py-2.5 rounded-lg font-medium transition-all duration-300 flex items-center gap-2 ${
                  link.primary 
                    ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:from-yellow-600 hover:to-amber-700' 
                    : `text-gray-300 hover:text-white ${isActive ? 'text-white' : ''}`
                }`
              }
            >
              {link.icon}
              <span>{link.label}</span>
            </NavLink>
          ))}
        </div>
        
        {/* Right Section - App Links and User Profile */}
        <div className='flex items-center gap-4'>
          {/* User Profile Button */}
          <div className='relative'>
            <button 
              onClick={() => {
                if (!isLoggedIn) {
                  navigate('/login');
                } else {
                  setShowProfilePopup(!showProfilePopup);
                }
              }}
              className='border-2 border-gray-300 rounded-full p-2 hover:bg-gray-800 transition-colors'
            >
              <User className='text-white w-5 h-5'/>
            </button>

            {/* Profile Popup */}
            {isLoggedIn && showProfilePopup && (
              <div className='absolute right-0 mt-2 w-[15rem] bg-white rounded-xl shadow-2xl py-3 z-50 overflow-hidden'>
                <div className='flex justify-between items-center px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-200'>
                  <h3 className='font-bold text-gray-800'>My Account</h3>
                  <button 
                    onClick={() => setShowProfilePopup(false)} 
                    className='text-gray-500 hover:text-gray-700 rounded-full p-1 hover:bg-gray-300'
                  >
                    <X className='w-5 h-5'/>
                  </button>
                </div>
                
                <div className='px-4 py-3 border-b border-gray-200'>
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center'>
                      <UserCircle className='w-6 h-6 text-white'/>
                    </div>
                    <div>
                      <p className='font-medium text-gray-900 truncate max-w-[8rem]'>
                        {localStorage.getItem('userEmail')?.split('@')[0] || 'User'}
                      </p>
                      <p className='text-xs text-gray-500 truncate max-w-[10rem]'>
                        {localStorage.getItem('userEmail') || ''}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className='py-2'>
                  <button 
                    className='w-full px-4 py-3 text-left text-gray-700 hover:bg-gray-100 flex items-center gap-3 transition-colors'
                    onClick={() => {
                      navigate('/profile');
                      setShowProfilePopup(false);
                    }}
                  >
                    <UserCircle className='w-5 h-5 text-blue-500'/>
                    <span>View Profile</span>
                  </button>
                  <button 
                    className='w-full px-4 py-3 text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition-colors'
                    onClick={handleLogout}
                  >
                    <LogOut className='w-5 h-5'/>
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile Header */}
      <div className='h-[5rem] md:hidden flex items-center justify-between px-4'>
        <button 
          className='text-white p-2 rounded-lg hover:bg-gray-800 transition-colors'
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          <Menu className='w-6 h-6' />
        </button>
        
        <NavLink to="/">
          <img 
            src={Logo} 
            alt="logo" 
            className='w-28'
          />
        </NavLink>
        
        <button 
          onClick={() => {
            if (!isLoggedIn) {
              navigate('/login');
            } else {
              setShowProfilePopup(!showProfilePopup);
            }
          }}
          className='border-2 border-gray-300 rounded-full p-2 hover:bg-gray-800 transition-colors'
        >
          <User className='text-white w-5 h-5'/>
        </button>
      </div>
      
      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className='md:hidden bg-gradient-to-b from-gray-900 to-black py-4 px-6 border-t border-gray-800'>
          <div className='flex flex-col gap-3'>
            {navLinks.map((link, index) => (
              <NavLink
                key={index}
                to={link.path}
                className={({ isActive }) => 
                  `py-3 px-4 rounded-lg font-medium transition-all flex items-center gap-3 ${
                    link.primary 
                      ? 'bg-gradient-to-r from-yellow-500 to-amber-600 text-black' 
                      : `text-gray-300 hover:text-white ${isActive ? 'text-white bg-gray-800' : ''}`
                  }`
                }
                onClick={() => setShowMobileMenu(false)}
              >
                {link.icon}
                <span>{link.label}</span>
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default Header
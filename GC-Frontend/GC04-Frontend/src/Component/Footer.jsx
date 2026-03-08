import React from 'react';
// Assuming you have these assets in your project
// import AppleLogo from '../assets/Images/apple-store.svg';
// import GooglePlay from '../assets/Images/google-play.svg';
import {
  Facebook, Twitter, Instagram, Mail, Phone, MapPin, Globe, ChevronRight, Send
} from 'lucide-react';

// For cleaner management, define link data as arrays of objects
const popularDestinations = [
  { name: "Colombo", href: "#" },
  { name: "Kandy", href: "#" },
  { name: "Galle", href: "#" },
  { name: "Jaffna", href: "#" },
  { name: "Anuradhapura", href: "#" },
  { name: "Trincomalee", href: "#" },
  { name: "Nuwara Eliya", href: "#" },
  { name: "Hambantota", href: "#" },
];

const quickLinks = [
  { name: "About Us", href: "#" },
  { name: "Services", href: "#" },
  { name: "Contact Us", href: "#" },
  { name: "Book a Seat", href: "#" },
];

const socialMediaLinks = [
  { icon: <Facebook className="w-5 h-5" />, bg: "bg-blue-600", hoverBg: "hover:bg-blue-700", href: "#", name: "Facebook" },
  { icon: <Twitter className="w-5 h-5" />, bg: "bg-sky-500", hoverBg: "hover:bg-sky-600", href: "#", name: "Twitter" },
  { icon: <Instagram className="w-5 h-5" />, bg: "bg-gradient-to-br from-purple-600 to-pink-600", hoverBg: "hover:opacity-90", href: "#", name: "Instagram" },
];

function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-300">
      <div className="relative px-4 sm:px-6 lg:px-8 py-16 md:py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-48 h-48 bg-blue-900/20 rounded-full blur-3xl -z-0"></div>
        <div className="absolute bottom-10 right-0 w-64 h-64 bg-amber-600/10 rounded-full blur-3xl -z-0"></div>
      
        <div className="relative z-10 max-w-7xl mx-auto">
          {/* Main footer content grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">

            {/* Column 1: Brand Info & Contact */}
            <div className="sm:col-span-2 lg:col-span-1 space-y-6">
              <div className="flex items-center gap-2">
                <h2 className='font-semibold text-2xl text-white'>Staff Bus Service.lk</h2>
                <span className="bg-gradient-to-r from-yellow-500 to-amber-600 text-black text-xs font-bold px-2.5 py-1 rounded-full">
                  PREMIUM
                </span>
              </div>
              <p className="text-sm leading-relaxed">
                Your trusted partner for comfortable and reliable staff transport across Sri Lanka.
              </p>
              <div className="space-y-3">
                <a href="tel:+94766764848" className="flex items-center gap-3 group">
                  <Phone className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="group-hover:text-white transition-colors">(+94) 76 676 4848</span>
                </a>
                <a href="mailto:info@Staff Bus Service.lk" className="flex items-center gap-3 group">
                  <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span className="group-hover:text-white transition-colors">info@Staff Bus Service.lk</span>
                </a>
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-400 mt-1 flex-shrink-0" />
                  <span>123 Colombo Road, Kandy, Sri Lanka</span>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-6">
              <h3 className="font-semibold text-base text-white">Quick Links</h3>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="flex items-center gap-2 group">
                      <ChevronRight className="w-4 h-4 text-blue-400 transition-transform group-hover:translate-x-1" />
                      <span className="group-hover:text-white transition-colors">{link.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Popular Destinations */}
            <div className="space-y-6">
              <h3 className="font-semibold text-base text-white">Popular Destinations</h3>
              <ul className="space-y-3">
                {popularDestinations.map((city) => (
                  <li key={city.name}>
                    <a href={city.href} className="flex items-center gap-2 group">
                      <ChevronRight className="w-4 h-4 text-blue-400 transition-transform group-hover:translate-x-1" />
                      <span className="group-hover:text-white transition-colors">{city.name}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Newsletter */}
            <div className="space-y-6">
              <h3 className="font-semibold text-base text-white">Stay Connected</h3>
              <p className="text-sm">
                Subscribe for travel tips, special offers, and service updates.
              </p>
              <form className="flex gap-2">
                <label htmlFor="email-subscribe" className="sr-only">Your email address</label>
                <input
                  id="email-subscribe"
                  type="email"
                  placeholder="Your email"
                  className="w-full px-4 py-2.5 rounded-lg bg-gray-800/60 border border-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="bg-blue-600 text-white p-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
               {/* Social Media */}
              <div className="pt-4">
                  <h4 className="font-medium text-gray-200 mb-3">Follow Us</h4>
                  <div className="flex gap-3">
                    {socialMediaLinks.map((social) => (
                      <a
                        key={social.name}
                        href={social.href}
                        aria-label={social.name}
                        className={`w-10 h-10 rounded-full flex items-center justify-center text-white transition-all ${social.bg} ${social.hoverBg}`}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Copyright and bottom bar */}
      <div className="border-t border-gray-800/50 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
            <p className="text-center md:text-left">
              © {new Date().getFullYear()} Staff Bus Service.lk. All Rights Reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-2">
              <a href="#" className="hover:text-gray-300 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-gray-300 transition-colors">Sitemap</a>
            </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
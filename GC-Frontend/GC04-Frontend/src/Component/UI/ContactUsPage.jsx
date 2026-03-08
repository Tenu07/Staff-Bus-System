import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, Clock, User, MessageSquare, Users, Headset, Shield, Bus } from 'lucide-react';

function ContactUsPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1500);
  };

  const staffMembers = [
    {
      name: "Nimal Perera",
      role: "Senior Travel Consultant",
      bio: "15+ years experience in travel planning",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
    },
    {
      name: "Sunil Fernando",
      role: "Customer Support Manager",
      bio: "Dedicated to resolving travel issues promptly",
      image: "https://images.unsplash.com/photo-1544168190-79c17527004f?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Priyanka Silva",
      role: "Group Travel Specialist",
      bio: "Expert in corporate and group bookings",
      image: "https://plus.unsplash.com/premium_photo-1661515449711-ace459054f78?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      name: "Rajiv Bandara",
      role: "Safety & Compliance Officer",
      bio: "Ensuring your journey meets all safety standards",
      image: "https://images.unsplash.com/photo-1545167622-3a6ac756afa4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=712&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 font-poppins mt-10">
      {/* Hero Section with Staff Focus */}
      <div className="relative h-[500px] overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1519501025264-65ba15a82390?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1664&q=80')",
          }}
        ></div>
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
              Professional Staff Service for Your Journey
            </h1>
            <p className="text-xl text-white mb-8">
              Our dedicated team of travel experts is committed to providing personalized service for all your bus travel needs in Sri Lanka.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact-form" 
                className="bg-white text-blue-800 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                Contact Our Team
              </a>
              <a 
                href="#our-staff" 
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Meet Our Staff
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Value Proposition */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Experienced Travel Consultants</h3>
            <p className="text-gray-600">
              Our team averages 10+ years in the travel industry, ensuring expert advice for your journey.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Headset className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">24/7 Customer Support</h3>
            <p className="text-gray-600">
              Assistance available around the clock for any travel emergencies or itinerary changes.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 text-center border border-blue-100">
            <div className="bg-blue-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">Safety-First Approach</h3>
            <p className="text-gray-600">
              Our staff prioritizes your safety with rigorous standards and regular training.
            </p>
          </div>
        </div>
      </div>

      {/* Staff Introduction */}
      <div id="our-staff" className="bg-gradient-to-b from-white to-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Meet Our Travel Experts</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our professional team is dedicated to making your bus travel experience seamless and enjoyable.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {staffMembers.map((staff, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden group">
                <div className="relative h-80 overflow-hidden">
                  <img 
                    src={staff.image} 
                    alt={staff.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold">{staff.name}</h3>
                    <p className="text-blue-300">{staff.role}</p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 mb-4">{staff.bio}</p>
                  <div className="flex items-center gap-3">
                    <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">Contact</span>
                    </a>
                    <a href="#" className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      <span className="text-sm">Call</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Card 1 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all border border-gray-100">
            <div className="bg-blue-100 p-4 rounded-full mb-6">
              <Phone className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Call Our Team</h3>
            <p className="text-gray-600 mb-4">Speak directly with our professional support staff</p>
            <a href="tel:+94766764848" className="text-2xl font-semibold text-blue-600 hover:underline">
              (+94) 76 676 4848
            </a>
            <p className="text-sm text-gray-500 mt-4">24/7 Support Available</p>
          </div>

          {/* Contact Card 2 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all border border-gray-100">
            <div className="bg-green-100 p-4 rounded-full mb-6">
              <Mail className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Email Our Experts</h3>
            <p className="text-gray-600 mb-4">Get personalized assistance from our travel consultants</p>
            <a href="mailto:info@Staff Bus Service.lk" className="text-xl font-semibold text-green-600 hover:underline">
              info@Staff Bus Service.lk
            </a>
            <p className="text-sm text-gray-500 mt-4">Response within 1 business day</p>
          </div>

          {/* Contact Card 3 */}
          <div className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center hover:shadow-2xl transition-all border border-gray-100">
            <div className="bg-amber-100 p-4 rounded-full mb-6">
              <MapPin className="w-10 h-10 text-amber-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Visit Our Office</h3>
            <p className="text-gray-600 mb-4">Meet with our staff for personalized travel planning</p>
            <p className="text-lg font-medium text-gray-800">
              123 Galle Road, Colombo 03
            </p>
            <p className="text-sm text-gray-500 mt-4">Open Mon-Fri: 8am-6pm</p>
          </div>
        </div>
      </div>

      {/* Contact Form and Support Services */}
      <div id="contact-form" className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-800 mb-3">Contact Our Support Team</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Our professional staff is ready to assist with bookings, itinerary changes, or any travel inquiries.
              </p>
            </div>

            {submitSuccess ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center mb-8">
                <div className="text-green-600 text-5xl mb-4">✓</div>
                <h3 className="text-2xl font-bold text-green-800 mb-2">Message Received!</h3>
                <p className="text-green-700">
                  A member of our staff will contact you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <User className="w-5 h-5" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your Name"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  
                  <div className="relative">
                    <div className="absolute left-3 top-3 text-gray-400">
                      <Mail className="w-5 h-5" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Your Email"
                      required
                      className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-3 top-3 text-gray-400">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">How can we assist you?</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your travel needs or inquiry..."
                    rows="5"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                
                <div>
                  <label className="block text-gray-700 mb-2">Preferred Contact Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer">
                      <input type="radio" name="contactMethod" className="mr-2" defaultChecked />
                      <span>Phone Call</span>
                    </label>
                    <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer">
                      <input type="radio" name="contactMethod" className="mr-2" />
                      <span>Email</span>
                    </label>
                  </div>
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full py-4 px-6 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Contact Our Team
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
          
          {/* Support Services */}
          <div>
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-xl p-8 mb-10 border border-blue-100">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">Our Support Services</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full mt-1">
                    <Bus className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Booking Assistance</h4>
                    <p className="text-gray-600">
                      Our staff can help you find the perfect route, select seats, and make special arrangements.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full mt-1">
                    <Shield className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Travel Safety Information</h4>
                    <p className="text-gray-600">
                      Get the latest updates on safety protocols, travel restrictions, and health guidelines.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full mt-1">
                    <Clock className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Itinerary Changes</h4>
                    <p className="text-gray-600">
                      Need to modify your travel plans? Our staff can assist with rescheduling and cancellations.
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-blue-100 p-3 rounded-full mt-1">
                    <Users className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">Group Travel Coordination</h4>
                    <p className="text-gray-600">
                      Specialized assistance for corporate travel, school trips, and large group bookings.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Office Hours */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Staff Availability</h3>
              <div className="space-y-4">
                <div className="flex justify-between border-b pb-3">
                  <span>Monday - Friday</span>
                  <span className="font-medium">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between border-b pb-3">
                  <span>Saturday</span>
                  <span className="font-medium">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between pb-3">
                  <span>Sunday & Holidays</span>
                  <span className="font-medium">9:00 AM - 1:00 PM</span>
                </div>
                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-blue-700 font-medium">
                    24/7 Emergency Support: (+94) 76 676 4848
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-900 to-indigo-900 py-20 px-4">
        <div className="container mx-auto text-center max-w-3xl">
          <Bus className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Experience Professional Travel Service</h2>
          <p className="text-gray-200 text-xl mb-10">
            Let our expert staff handle all your bus travel needs across Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-white text-blue-800 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-colors">
              Book with Our Experts
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 transition-colors">
              Call Our Team Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
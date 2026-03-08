import axios from 'axios';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Forms() {
  const navigate = useNavigate();
  const [routes, setRoutes] = useState([]);
  const [pageStatus, setPageStatus] = useState("loading");
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [date, setDate] = useState("");
  const [isSwapping, setIsSwapping] = useState(false);

  useEffect(() => {
    if (pageStatus === "loading") {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/route/")
        .then((res) => {
          setRoutes(res.data);
          setPageStatus("loaded");
          
          if (res.data.length > 0) {
            setStartLocation(res.data[0].startLocation);
            setEndLocation(res.data[0].endLocation);
            setDate(new Date().toISOString().split('T')[0]);
          }
        })
        .catch(error => {
          console.error("Error fetching routes:", error);
          setPageStatus("error");
        });
    }
  }, [pageStatus]);

  const handleSearch = async () => {
    if (!startLocation || !endLocation || !date) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/buses/selectedbus",
        { startLocation, endLocation, date }
      );
      
      navigate('/routes', { state: { buses: response.data.buses } });
    } catch (error) {
      navigate('/routes', { state: { buses: [] } });
    }
  };

  // Swap locations
  const swapLocations = () => {
    setIsSwapping(true);
    const temp = startLocation;
    setStartLocation(endLocation);
    setEndLocation(temp);
    
    setTimeout(() => setIsSwapping(false), 300);
  };

  // Get unique locations from routes
  const startLocations = [...new Set(routes.map(route => route.startLocation))];
  const endLocations = [...new Set(routes.map(route => route.endLocation))];

  return (
    <div className="w-full">
      <div className="bg-white rounded-xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl border border-gray-100">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold text-gray-800">Plan Your Journey</h2>
          <p className="text-gray-600 mt-1">Find the perfect bus for your trip</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-center">
          {/* From City */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <select 
                value={startLocation}
                onChange={(e) => setStartLocation(e.target.value)}
                className={`w-full h-12 pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white appearance-none ${isSwapping ? 'bg-blue-50' : ''} transition-all duration-300`}
              >
                {startLocations.map((location, index) => (
                  <option key={`from-${index}`} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Swap Button */}
          <div className="flex items-center justify-center pt-5">
            <button 
              onClick={swapLocations}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-300"
              aria-label="Swap locations"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            </button>
          </div>
          
          {/* To City */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500 z-10" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <select 
                value={endLocation}
                onChange={(e) => setEndLocation(e.target.value)}
                className={`w-full h-12 pl-10 pr-10 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800 bg-white appearance-none ${isSwapping ? 'bg-blue-50' : ''} transition-all duration-300`}
              >
                {endLocations.map((location, index) => (
                  <option key={`to-${index}`} value={location}>
                    {location}
                  </option>
                ))}
              </select>
              {/* Custom dropdown arrow */}
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Date Selection */}
          <div className="md:col-span-3 mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Travel Date</label>
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-blue-500" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-12 pl-10 pr-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-800"
                required
              />
            </div>
          </div>
        </div>
        
        {/* Search Button */}
        <div className="mt-8 flex justify-center">
          <button 
            onClick={handleSearch}
            className="w-full md:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            Find Bus Routes
          </button>
        </div>
        
        {/* Popular Routes */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Popular Routes:</h3>
          <div className="flex flex-wrap gap-2">
            {routes.slice(0, 4).map((route, index) => (
              <button
                key={`route-${index}`}
                onClick={() => {
                  setStartLocation(route.startLocation);
                  setEndLocation(route.endLocation);
                }}
                className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 rounded-full hover:bg-blue-100 transition-colors"
              >
                {route.startLocation} → {route.endLocation}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forms;
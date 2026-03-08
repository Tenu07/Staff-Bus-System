import React, { useEffect, useState } from 'react';
import { Plus, Search, Trash2, MapPin } from 'lucide-react';
import RouteForm from '../AdminComponent/RouteForm';
import axios from 'axios';
import toast from 'react-hot-toast';

function RouteDetails() {
  const [pageStatus, setPageStatus] = useState(false);
  const [routDetails, setRouteDetails] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!pageStatus) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/route/").then((res) => {
        setRouteDetails(res.data);
        console.log(res.data);
        setPageStatus(true);
      }).catch((error) => {
        toast.error("Failed to get routes");
      });
    }
  }, [pageStatus]);

  const handleAddRoute = () => {
    setShowAddModal(false);
  };

  const filteredRoutes = routDetails.filter(route =>
    route.routeNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.startLocation.toLowerCase().includes(searchTerm.toLowerCase()) ||
    route.endLocation.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 ml-64 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Route Details</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Route
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by route number or locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Route Table */}
      {pageStatus ? <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Route Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Distance</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRoutes.map((route) => (
              <tr key={route.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{route.routeNo}</td>
                <td className="px-6 py-4 whitespace-nowrap">{route.startLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{route.endLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{route.distance}</td>
                <td className="px-6 py-4 whitespace-nowrap">{route.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    route.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {route.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    className="text-red-600 hover:text-red-900"
                    onClick={() => {
                      const token = localStorage.getItem("token");
                      axios
                        .delete(
                          import.meta.env.VITE_BACKEND_URL + `/api/route/${route._id}`,
                          {
                            headers: {
                              Authorization: `Bearer ${token}`,
                            },
                          }
                        )
                        .then((res) => {
                          console.log(res.data);
                          toast.success("Bus deleted successfully");
                          setPageStatus(false);
                        });
                    }}
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <div>Loading</div>}

      {/* Full Screen Route Form */}
      {showAddModal && (
        <RouteForm 
          onSubmit={handleAddRoute} 
          onClose={() => setShowAddModal(false)} 
        />
      )}
    </div>
  );
}

export default RouteDetails;
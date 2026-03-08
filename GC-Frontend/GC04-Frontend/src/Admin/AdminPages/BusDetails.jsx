import React, { useEffect, useState } from 'react';
import { Plus, Search, Trash2 } from 'lucide-react';
import BusForm from '../AdminComponent/BusForm';
import axios from 'axios';
import toast from 'react-hot-toast';

function BusDetails() {
  const [busData, setBusData] = useState(false);
  const [buses, setBuses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (!busData) {
      axios.get(import.meta.env.VITE_BACKEND_URL + "/api/buses/getallBus")
        .then((res) => {
          setBuses(res.data);
          setBusData(true);
        }, []).catch((error) => {
          toast.error("Failed to get bus details");
        });
    }
  }, [busData]);

  const filteredBuses = buses.filter(bus =>
    bus.busNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.busName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 ml-64 font-poppins">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Bus Details</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-5 h-5 mr-2" />
          Add New Bus
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search by bus number or name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      {/* Bus Table */}
      {busData ? 
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bus Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capacity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBuses.map((bus) => (
                <tr key={bus.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{bus.busNo}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bus.busName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bus.busType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{bus.noOfSeats}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      className="text-red-600 hover:text-red-900"
                      onClick={() => {
                        const token = localStorage.getItem("token");
                        axios
                          .delete(
                            import.meta.env.VITE_BACKEND_URL + `/api/buses/${bus._id}`,
                            {
                              headers: {
                                Authorization: `Bearer ${token}`,
                              },
                            }
                          )
                          .then((res) => {
                            console.log(res.data);
                            toast.success("Bus deleted successfully");
                            setBusData(false);
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
        </div> : <div>loading</div>}

      {/* Full Screen Bus Form */}
      {showAddModal && (
        <BusForm 
          onClose={() => setShowAddModal(false)} 
        />
      )}
    </div>
  );
}

export default BusDetails;
import React, { useEffect, useState } from "react";
import { Clock, Edit, Trash2 } from "lucide-react";
import api from "@/utlis/axios.js";
import { useNavigate } from "react-router-dom";
import Nav from '@/Components/Admin/Admin_Nav.jsx'

const Admin_Tour_Package = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch packages
  const fetchPackages = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await api.get("/admin-packages", {
        headers: { Authorization: `Bearer ${token}` }
      }); 
      setPackages(res.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching packages:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Delete package
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      const token = localStorage.getItem("admin_token");
      await api.delete(`/admin-packages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update state immediately after successful deletion
      setPackages(packages.filter((pkg) => pkg.id !== id));
      alert("Package deleted successfully!");
    } catch (err) {
      console.error("Error deleting package:", err);
      alert("Error deleting package. Please try again.");
    }
  };

  // Toggle enable/disable - Fixed function
  const handleToggle = async (id) => {
    try {
      const token = localStorage.getItem("admin_token");
      
      // Call the toggle endpoint
      const response = await api.patch(`/admin-packages/${id}/toggle`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      // Update the packages state with the new enabled status
      setPackages(prevPackages => 
        prevPackages.map((pkg) =>
          pkg.id === id 
            ? { ...pkg, enabled: response.data.enabled }
            : pkg
        )
      );
      
      // Show success message
      alert(response.data.message || 'Package status updated successfully!');
      
    } catch (err) {
      console.error("Error toggling package:", err);
      alert("Error updating package status. Please try again.");
    }
  };

  if (loading) {
    return (
      <section className="bg-gray-50 py-16">
        <Nav className="mb-[50px]"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center mt-[50px]">
            <div className="text-xl">Loading packages...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-gray-50 py-16">
        <Nav className="mb-[50px]"/>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top bar with Add button */}
        <div className="flex justify-between items-center mt-[50px] mb-[30px]">
          <h2 className="text-2xl font-bold text-gray-800">Manage Packages</h2>
          <button
            onClick={() => navigate("/admin-packages")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Add New Package
          </button>
        </div>

        {/* Check if no packages exist */}
        {packages.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-xl mb-4">No tour packages found</p>
            <button
              onClick={() => navigate("/admin-packages")}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
            >
              Create Your First Package
            </button>
          </div>
        ) : (
          /* Packages Grid */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 min-h-[420px] relative ${
                  !pkg.enabled ? 'opacity-60 grayscale' : ''
                }`}
              >
                {/* Toggle Switch - Always visible */}
                <div className="absolute top-4 right-4 flex items-center z-20">
                  <div className="flex items-center gap-2 bg-white bg-opacity-90 backdrop-blur-sm rounded-full px-3 py-1 shadow-sm">
                    <span className={`text-sm font-medium ${pkg.enabled ? 'text-green-600' : 'text-gray-500'}`}>
                      {pkg.enabled ? 'Active' : 'Inactive'}
                    </span>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={pkg.enabled || false}
                        onChange={() => handleToggle(pkg.id, pkg.enabled)}
                        className="sr-only peer"
                      />
                      <div className={`w-11 h-6 rounded-full peer relative transition-all duration-300 ${
                        pkg.enabled ? 'bg-green-500' : 'bg-gray-300'
                      }`}>
                        <div className={`absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-transform duration-300 ${
                          pkg.enabled ? 'translate-x-full' : 'translate-x-0'
                        }`}></div>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Image */}
                <div className="h-56 overflow-hidden flex justify-center items-center mt-[60px]">
                  <div className="w-[300px] h-[300px] transition-transform duration-500 hover:scale-105">
                    {pkg.main_image ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL.replace(
                          "/api",
                          ""
                        )}${pkg.main_image}`}
                        alt={pkg.title}
                        className="w-full h-full object-cover hover:scale-105 duration-300 transition-transform ease-in-out"
                        onError={(e) => {
                          e.target.src = '/placeholder-image.jpg'; // Fallback image
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">No Image</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-left flex flex-col justify-between flex-1">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2 min-h-[55px]">
                    {pkg.title}
                  </h3>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    {pkg.total_days} Day{pkg.total_days > 1 ? 's' : ''}
                    <span className="ml-4">
                      {pkg.itineraries_count || 0} Itineraries
                    </span>
                  </div>

                  <p className="text-gray-600 text-justify leading-relaxed mb-4">
                    {pkg.description ? 
                      (pkg.description.length > 100 ? 
                        pkg.description.substring(0, 100) + "..." : 
                        pkg.description
                      ) : 
                      "No description available"
                    }
                  </p>

                  {/* Pricing Info */}
                  {(pkg.adult_single_price || pkg.child_single_price) && (
                    <div className="text-sm text-gray-600 mb-4">
                      {pkg.adult_single_price && (
                        <div>Adult: ${pkg.adult_single_price}</div>
                      )}
                      {pkg.child_single_price && (
                        <div>Child: ${pkg.child_single_price}</div>
                      )}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate(`/admin-editcards/${pkg.id}`)}
                      className="flex items-center px-4 py-2 bg-[#1A5775] text-white rounded-lg hover:bg-[#024360] transition"
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Admin_Tour_Package;
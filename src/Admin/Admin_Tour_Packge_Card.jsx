import React, { useEffect, useState } from "react";
import { Clock, Edit, Trash2 } from "lucide-react";
import api from "@/utlis/axios.js";
import { useNavigate } from "react-router-dom";
import Nav from '@/Components/Admin/Admin_Nav.jsx'

const Admin_Tour_Package = () => {
  const [packages, setPackages] = useState([]);
  const navigate = useNavigate();

  // Fetch packages
  const fetchPackages = async () => {
    try {
      const res = await api.get("/admin-packages"); 
      setPackages(res.data);
    } catch (err) {
      console.error("Error fetching packages:", err);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  // Delete package
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this package?")) return;
    try {
      await api.delete(`/admin-packages/${id}`);
      setPackages(packages.filter((pkg) => pkg.id !== id));
    } catch (err) {
      console.error("Error deleting package:", err);
    }
  };

  // Toggle enable/disable
  const handleToggle = async (id, currentStatus) => {
    try {
      await api.patch(`/admin-packages/${id}/toggle`, {
        is_active: !currentStatus,
      });
      setPackages(
        packages.map((pkg) =>
          pkg.id === id ? { ...pkg, is_active: !currentStatus } : pkg
        )
      );
    } catch (err) {
      console.error("Error toggling package:", err);
    }
  };

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

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 min-h-[420px] relative"
            >
              {/* Toggle Switch */}
              <div className="absolute top-4 right-4 flex items-center">
                <label className="inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pkg.is_active}
                    onChange={() => handleToggle(pkg.id, pkg.is_active)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-green-500 relative transition">
                    <div className="absolute top-[2px] left-[2px] bg-white w-5 h-5 rounded-full transition-transform peer-checked:translate-x-full"></div>
                  </div>
                </label>
              </div>

              {/* Image */}
              <div className="h-56 overflow-hidden flex justify-center items-center mt-[60px]">
                <div className="w-[300px] h-[300px] transition-transform duration-500 hover:scale-105">
                  <img
                    src={`${import.meta.env.VITE_API_URL.replace(
                      "/api",
                      ""
                    )}${pkg.main_image}`}
                    alt={pkg.title}
                    className="w-full h-full object-cover hover:scale-105 duration-300 transition-transform ease-in-out"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 text-left flex flex-col justify-between flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 min-h-[55px]">
                  {pkg.title}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  {pkg.total_days} Days
                </div>

                <p className="text-gray-600 text-justify leading-relaxed mb-4">
                  {pkg.description?.substring(0, 100)}...
                </p>

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

      </div>
    </section>
  );
};

export default Admin_Tour_Package;

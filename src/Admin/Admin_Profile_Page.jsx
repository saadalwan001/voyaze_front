// src/Pages/Admin/AdminProfile.jsx
import React, { useEffect, useState } from "react";
import api from "@/utlis/axios.js";
import Admin_Nav from "@/Components/Admin/Admin_Nav.jsx";


export default function AdminProfile() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    current_password: "",
    new_password: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  // Fetch admin profile data on mount
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        const res = await api.get("/admin-profile"); 
        setForm((prevForm) => ({
          ...prevForm,
          name: res.data.name,
          email: res.data.email,
        }));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching admin profile:", err);
        setLoading(false);
      }
    };
    fetchAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await api.patch("/admin-profile", form);
      alert(res.data.message || "Profile updated successfully!");
      setForm((prevForm) => ({ ...prevForm, currentPassword: "", newPassword: "" }));
      setSubmitting(false);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating profile!");
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <>
        <Admin_Nav />
        <div className="max-w-3xl mx-auto px-4 py-20 text-center text-lg text-gray-600">
          Loading profile...
        </div>
      </>
    );
  }

  return (
    <>
      <Admin_Nav />
      <div className="max-w-3xl mx-auto px-4 py-10 mt-20">
        <h2 className="text-3xl font-extrabold text-center mb-10">Admin Profile</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Current Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Current Password</label>
            <input
              type="password"
              name="current_password"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password to change password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">New Password</label>
            <input
              type="password"
              name="new_password"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-[#024360] text-white px-6 py-3 rounded-lg hover:text-[#75798B] shadow-md transition duration-200 font-medium"
              disabled={submitting}
            >
              {submitting ? "Updating..." : "Update Profile"}
            </button>
          </div>
        </form>
      </div>
      
    </>
  );
}

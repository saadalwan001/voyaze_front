import React, { useEffect, useState } from "react";
import api from "@/utlis/axios.js";
import Admin_Nav from "@/Components/Admin/Admin_Nav.jsx";


export default function Admin_Contact() {
  const [contact, setContact] = useState({
    address: "",
    phone1: "",
    phone2: "",
    land_p: "",
    whatsapp: "",
    email: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // Fetch contact data
  useEffect(() => {
    const fetchContact = async () => {
      try {
        const res = await api.get("/company-contact");
        setContact(res.data);
      } catch (err) {
        console.error("Error fetching contact info:", err);
        alert("Failed to load contact info");
      } finally {
        setLoading(false);
      }
    };
    fetchContact();
  }, []);

  // Handle form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  // Handle save
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await api.put(`/company-contact/${contact.id}`, contact);
      alert("Contact info updated successfully!");
    } catch (err) {
      console.error("Error updating contact info:", err);
      alert("Failed to update contact info");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <>
      <Admin_Nav />
      <div className="max-w-5xl mx-auto px-4 py-10 mt-25">
        <h2 className="text-3xl font-extrabold text-center mb-10">Edit Company Contact</h2>
        <form onSubmit={handleSave} className="space-y-6 bg-white shadow p-6 rounded-lg">
          
          {/* Address */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={contact.address || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Phone 1 */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Phone 1</label>
            <input
              type="text"
              name="phone1"
              value={contact.phone1 || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Phone 2 */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Phone 2</label>
            <input
              type="text"
              name="phone2"
              value={contact.phone2 || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Land Phone */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Landline</label>
            <input
              type="text"
              name="land_p"
              value={contact.land_p || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* WhatsApp */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">WhatsApp</label>
            <input
              type="text"
              name="whatsapp"
              value={contact.whatsapp || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={contact.email || ""}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              disabled={saving}
              className="bg-[#024360] text-white px-6 py-3 rounded-lg hover:text-[#75798B] shadow-md transition duration-200 font-medium"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
      
    </>
  );
}

import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "@/utlis/axios.js";
import Admin_Nav from "@/Components/Admin/Admin_Nav.jsx";
import { X } from "lucide-react";
import Footer from "@/Components/Footer";

export default function AdminBlogCreate() {
  const navigate = useNavigate();

  const [admins, setAdmins] = useState([]);
  const [title, setTitle] = useState("");
  const [adminId, setAdminId] = useState("");
  const [category, setCategory] = useState("");
  const [publishedDate, setPublishedDate] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null); // contenteditable div

  const categories = [
    "Travel Tips",
    "Destinations",
    "Cultural Experiences",
    "Adventure & Activities",
    "Food & Cuisine",
    "Events & Festivals",
    "Luxury Travel",
    "Budget Travel",
    "Family Travel",
  ];

  // Fetch admins for dropdown
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const res = await api.get("/admins");
        setAdmins(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchAdmins();
  }, []);

  const handleImageChange = (file) => {
    setImage(file);
    setImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const removeImage = () => {
    setImage(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("admin_id", adminId);
    formData.append("category", category);
    formData.append("publisher_date", new Date().toISOString().split("T")[0]);

    const descriptionHTML = editorRef.current.innerHTML;
    formData.append("description", descriptionHTML);

    if (image) {
      formData.append("image", image, image.name);
    }

    try {
      await api.post("/admin-blogs", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setLoading(false);
      alert("Blog Created Sucessfull");
      navigate("/admin-dashboard");
    } catch (err) {
      console.error(err);
      setLoading(false);
      alert(err.response?.data?.message || "Error creating blog!");
    }
  };

  return (
    <>
      <Admin_Nav />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-extrabold text-center mb-10">Create Blog</h2>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Author */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Author</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              value={adminId}
              onChange={(e) => setAdminId(e.target.value)}
              required
            >
              <option value="">Select Author</option>
              {admins?.map((admin) => (
                <option key={admin.id} value={admin.id}>{admin.name}</option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Category</label>
            <select
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Published Date */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Published Date</label>
            <input
              type="date"
              value={publishedDate}
              onChange={(e) => setPublishedDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Description</label>
            
            <div
              ref={editorRef}
              contentEditable
              className="border border-gray-300 rounded-lg min-h-[200px] p-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Type or paste your formatted text here..."
              suppressContentEditableWarning={true}
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Image</label>
            <div className="flex items-center gap-4">
              {imagePreview ? (
                <div className="relative">
                  <img src={imagePreview} alt="Preview" className="w-48 h-28 object-cover rounded-md" />
                  <button
                    type="button"
                    onClick={removeImage}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageChange(e.target.files[0])}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-[#024360] text-white px-6 py-3 rounded-lg hover:text-[#75798B] shadow-md transition duration-200 font-medium"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Create Blog"}
            </button>
          </div>
        </form>
      </div>
      <Footer/>
    </>
  );
}

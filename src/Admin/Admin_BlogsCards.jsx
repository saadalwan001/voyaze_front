import React, { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import api from "@/utlis/axios.js";
import { useNavigate } from "react-router-dom";
import Admin_Nav from "@/Components/Admin/Admin_Nav.jsx";

const Admin_Blog_Cards = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // Fetch blogs from API
  const fetchBlogs = async () => {
    try {
      const res = await api.get("/admin-blogs");
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Delete blog
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await api.delete(`/admin-blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  return (
    <section className="bg-gray-50 py-16">
      <Admin_Nav className="mb-[50px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top bar with Add button */}
        <div className="flex justify-between items-center mt-[50px] mb-[30px]">
          <h2 className="text-2xl font-bold text-gray-800">Manage Blogs</h2>
          <button
            onClick={() => navigate("/admin-create-blogs")}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
          >
            Add New Blog
          </button>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 min-h-[420px] flex flex-col"
            >
              {/* Image */}
              <div className="h-56 overflow-hidden flex justify-center items-center mt-5">
                <div className="w-[300px] h-[300px] transition-transform duration-500 hover:scale-105">
                  <img
                    src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${blog.img_url}`}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 duration-300 transition-transform ease-in-out"
                  />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col justify-between flex-1">
                <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-3">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-500 mb-2">
                  {blog.category} | {blog.publisher_date}
                </p>

                <p className="text-gray-600 text-justify mb-4 line-clamp-4">
                  {blog.description?.replace(/<[^>]+>/g, "")}
                </p>

                {/* Actions */}
                <div className="flex justify-between mt-auto">
                  <button
                    onClick={() => navigate(`/admin-edit-blogs/${blog.id}`)}
                    className="flex items-center px-4 py-2 bg-[#1A5775] text-white rounded-lg hover:bg-[#024360] transition"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(blog.id)}
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

export default Admin_Blog_Cards;

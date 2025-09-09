import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "@/utlis/axios.js";
import Admin_Nav from "@/Components/Admin/Admin_Nav.jsx";
import { X } from "lucide-react";

export default function Admin_EditAttraction() {
  const navigate = useNavigate();
  const { id } = useParams(); // Attraction ID from URL

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tourPackages, setTourPackages] = useState([]); // Optional: if you manage linked packages

  const [frontImg, setFrontImg] = useState(null);
  const [frontImgPreview, setFrontImgPreview] = useState(null);

  const [backImg, setBackImg] = useState(null);
  const [backImgPreview, setBackImgPreview] = useState(null);

  // Fetch attraction details
  useEffect(() => {
    const fetchAttraction = async () => {
      try {
        const res = await api.get(`/admin-attractions/${id}`);
        const data = res.data;
        setTitle(data.title || "");
        setDescription(data.description || "");
        setFrontImgPreview(
          data.front_img
            ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${data.front_img}`
            : null
        );
        setBackImgPreview(
          data.back_img
            ? `${import.meta.env.VITE_API_URL.replace("/api", "")}${data.back_img}`
            : null
        );
        if (data.tour_packages) setTourPackages(data.tour_packages);
      } catch (err) {
        console.error(err);
        alert("Error fetching attraction data!");
      }
    };

    fetchAttraction();
  }, [id]);

  const handleFrontImgChange = (file) => {
    setFrontImg(file);
    setFrontImgPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleBackImgChange = (file) => {
    setBackImg(file);
    setBackImgPreview(file ? URL.createObjectURL(file) : null);
  };

  const removeFrontImg = () => {
    setFrontImg(null);
    setFrontImgPreview(null);
  };

  const removeBackImg = () => {
    setBackImg(null);
    setBackImgPreview(null);
  };

  // Submit update
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);

    if (frontImg) formData.append("front_img", frontImg);
    if (backImg) formData.append("back_img", backImg);

    // Laravel PATCH workaround
    formData.append("_method", "PATCH");

    // Optional: send tour_packages if available
    if (tourPackages.length > 0) {
      tourPackages.forEach((pkgId) => formData.append("tour_packages[]", pkgId));
    }

    try {
      const token = localStorage.getItem("admin_token");
      await api.post(`/admin-attractions/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Attraction updated successfully!");
      navigate("/admin-attraction/cards");
    } catch (err) {
      console.error(err.response || err);
      alert(err.response?.data?.message || "Error updating attraction!");
    }
  };

  return (
    <>
      <Admin_Nav />
      <div className="max-w-5xl mx-auto px-4 py-10">
        <h2 className="text-3xl font-extrabold text-center mb-10">
          Edit Attraction
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">

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

          {/* Description */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 resize-none"
            />
          </div>

          {/* Front Image */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Front Image</label>
            <div className="flex items-center gap-4">
              {frontImgPreview ? (
                <div className="relative">
                  <img
                    src={frontImgPreview}
                    alt="Front Preview"
                    className="w-40 h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeFrontImg}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                  Upload Front Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleFrontImgChange(e.target.files[0])}
                  />
                </label>
              )}
            </div>
          </div>

          {/* Back Image */}
          <div>
            <label className="block font-medium text-gray-700 mb-2">Back Image</label>
            <div className="flex items-center gap-4">
              {backImgPreview ? (
                <div className="relative">
                  <img
                    src={backImgPreview}
                    alt="Back Preview"
                    className="w-40 h-24 object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={removeBackImg}
                    className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                  Upload Back Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleBackImgChange(e.target.files[0])}
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
            >
              Update Destination
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

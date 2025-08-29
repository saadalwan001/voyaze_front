import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "@/utlis/axios.js";
import Admin_Nav from "@/Components/Admin/Admin_Nav.jsx";
import { Check, X } from "lucide-react";

export default function Admin_Edit_Tour_Package() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [totalDays, setTotalDays] = useState(1);
  const [description, setDescription] = useState("");

  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);

  const [subImages, setSubImages] = useState([null, null, null, null]);
  const [subImagesPreview, setSubImagesPreview] = useState([null, null, null, null]);

  const [includedItems, setIncludedItems] = useState([]);
  const [excludedItems, setExcludedItems] = useState([]);

  const [itineraries, setItineraries] = useState([]);

  // --- Fetch existing package ---
  useEffect(() => {
    const fetchPackage = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await api.get(`/admin-packages/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pkg = res.data;

        setTitle(pkg.title);
        setTotalDays(pkg.total_days);
        setDescription(pkg.description);

        setMainImagePreview(pkg.main_image || null);
        setSubImagesPreview([
          pkg.sub_image1 || null,
          pkg.sub_image2 || null,
          pkg.sub_image3 || null,
          pkg.sub_image4 || null,
        ]);

        setIncludedItems(pkg.included_items || []);
        setExcludedItems(pkg.excluded_items || []);
        setItineraries(pkg.itineraries || []);
      } catch (err) {
        console.error(err);
        alert("Error fetching package data.");
      }
    };

    fetchPackage();
  }, [id]);

  // --- Image handlers ---
  const handleMainImageChange = (file) => {
    setMainImage(file);
    setMainImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubImageChange = (index, file) => {
    const updated = [...subImages];
    updated[index] = file;
    setSubImages(updated);

    const updatedPreview = [...subImagesPreview];
    updatedPreview[index] = file ? URL.createObjectURL(file) : updatedPreview[index];
    setSubImagesPreview(updatedPreview);
  };

  // --- Include / Exclude handlers ---
  const addIncludeItem = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      setIncludedItems([...includedItems, e.target.value.trim()]);
      e.target.value = "";
    }
  };
  const removeIncludeItem = (idx) => {
    const updated = [...includedItems];
    updated.splice(idx, 1);
    setIncludedItems(updated);
  };

  const addExcludeItem = (e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      setExcludedItems([...excludedItems, e.target.value.trim()]);
      e.target.value = "";
    }
  };
  const removeExcludeItem = (idx) => {
    const updated = [...excludedItems];
    updated.splice(idx, 1);
    setExcludedItems(updated);
  };

  // --- Itinerary handlers ---
  const updateItinerary = (index, key, value) => {
    const updated = [...itineraries];
    updated[index] = { ...updated[index], [key]: value };
    setItineraries(updated);
  };
  const addItinerary = () => {
    setItineraries([...itineraries, { day_title: "", description: "", include_toggle: false }]);
  };
  const removeItinerary = (index) => {
    const updated = [...itineraries];
    updated.splice(index, 1);
    setItineraries(updated);
  };

  // --- Submit handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("total_days", totalDays);
    formData.append("description", description);

    formData.append("included_items", JSON.stringify(includedItems));
    formData.append("excluded_items", JSON.stringify(excludedItems));
    formData.append("itineraries", JSON.stringify(itineraries));

    if (mainImage) formData.append("main_image", mainImage);
    subImages.forEach((img, idx) => img && formData.append(`sub_image${idx + 1}`, img));

    try {
      const token = localStorage.getItem("admin_token");
      await api.patch(`/admin-packages/${id}`, formData, {
        headers: { Authorization: `Bearer ${token}` }, // Do NOT set Content-Type manually
      });

      alert("Tour Package updated successfully!");
      navigate("/admin-packcards");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Error updating package!");
    }
  };

  return (
    <>
      <Admin_Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl font-extrabold text-[#313041] mt-20 mb-10 text-center sm:text-left">
          Edit Tour Package
        </h2>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title, Days, Description */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <label className="w-full sm:w-1/4 font-medium text-gray-700">Package Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <label className="w-full sm:w-1/4 font-medium text-gray-700">Total Days</label>
            <input
              type="number"
              min={1}
              value={totalDays}
              onChange={(e) => setTotalDays(e.target.value)}
              required
              className="w-full sm:w-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
            <label className="w-full sm:w-1/4 font-medium text-gray-700 mt-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 shadow-sm resize-none"
            />
          </div>

          {/* Includes / Excludes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="font-medium text-gray-700">Includes</label>
              <input
                type="text"
                placeholder="Press Enter to add"
                onKeyDown={addIncludeItem}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 shadow-sm"
              />
              <ul className="mt-2 space-y-1">
                {includedItems.map((item, i) => (
                  <li key={i} className="flex items-center justify-between bg-green-100 px-2 py-1 rounded-md">
                    <div className="flex items-center gap-1"><Check size={16} /> {item}</div>
                    <button type="button" onClick={() => removeIncludeItem(i)}>X</button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <label className="font-medium text-gray-700">Excludes</label>
              <input
                type="text"
                placeholder="Press Enter to add"
                onKeyDown={addExcludeItem}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 shadow-sm"
              />
              <ul className="mt-2 space-y-1">
                {excludedItems.map((item, i) => (
                  <li key={i} className="flex items-center justify-between bg-red-100 px-2 py-1 rounded-md">
                    <div className="flex items-center gap-1"><X size={16} /> {item}</div>
                    <button type="button" onClick={() => removeExcludeItem(i)}>X</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Itineraries */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Itineraries</h3>
            {itineraries.map((it, idx) => (
              <div key={idx} className="border p-3 rounded-lg mb-3">
                <input
                  type="text"
                  placeholder="Day Title"
                  value={it.day_title}
                  onChange={(e) => updateItinerary(idx, "day_title", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
                />
                <textarea
                  placeholder="Description"
                  value={it.description}
                  onChange={(e) => updateItinerary(idx, "description", e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 resize-none"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={it.include_toggle || false}
                    onChange={(e) => updateItinerary(idx, "include_toggle", e.target.checked)}
                  />
                  Include this day
                </label>
                <button
                  type="button"
                  onClick={() => removeItinerary(idx)}
                  className="mt-2 bg-red-500 text-white px-3 py-1 rounded-md"
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" onClick={addItinerary} className="bg-green-500 text-white px-4 py-2 rounded-md">
              Add Day
            </button>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              <div className="flex flex-col items-center">
                <label className="font-medium mb-1 text-gray-600">Main Image</label>
                <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                  Choose Image
                  <input type="file" className="hidden" onChange={(e) => handleMainImageChange(e.target.files[0])} />
                </label>
                {mainImagePreview && <img src={mainImagePreview} alt="Main Preview" className="mt-2 w-32 h-20 object-cover rounded-md" />}
              </div>
              {subImages.map((img, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <label className="font-medium mb-1 text-gray-600">Sub Image {idx + 1}</label>
                  <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                    Choose Image
                    <input type="file" className="hidden" onChange={(e) => handleSubImageChange(idx, e.target.files[0])} />
                  </label>
                  {subImagesPreview[idx] && <img src={subImagesPreview[idx]} alt={`Sub Preview ${idx + 1}`} className="mt-2 w-32 h-20 object-cover rounded-md" />}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="text-center sm:text-right">
            <button type="submit" className="bg-[#024360] text-white px-6 py-3 rounded-lg hover:text-[#75798B] shadow-md transition duration-200 text-lg font-medium">
              Update Tour Package
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

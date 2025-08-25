import React, { useState, useEffect } from "react";
import api from "@/utlis/axios.js";
import Admin_Nav from "@/Components/Admin/Admin_Nav.jsx";
import { Check, X } from "lucide-react";

export default function AdminTourPackage() {
  // --- States ---
  const [isNewPackage, setIsNewPackage] = useState(true);
  const [existingPackages, setExistingPackages] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState("");

  const [title, setTitle] = useState("");
  const [totalDays, setTotalDays] = useState(1);
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [subImages, setSubImages] = useState([null, null, null, null]);
  const [subImagesPreview, setSubImagesPreview] = useState([null, null, null, null]);

  const [itineraries, setItineraries] = useState([
    { day_title: "Day 1", description: "", includeToggle: false, includedItems: [], excludedItems: [] },
  ]);

  // --- Fetch existing packages ---
  useEffect(() => {
    if (!isNewPackage) {
      const fetchPackages = async () => {
        try {
          const token =localStorage.getItem("admin_token");
          const res = await api.get("/admin-packages" ,{
            headers:{Authorization:`Bearer ${token}`}});
          
          setExistingPackages(res.data);
          if (res.data.length > 0) setSelectedPackage(res.data[0].id);
        } catch (err) {
          console.error(err);
        }
      };
      fetchPackages();
    }
  }, [isNewPackage]);

  // --- Image Handlers ---
  const handleMainImageChange = (file) => {
    setMainImage(file);
    setMainImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubImageChange = (index, file) => {
    const updated = [...subImages];
    updated[index] = file;
    setSubImages(updated);

    const updatedPreview = [...subImagesPreview];
    updatedPreview[index] = file ? URL.createObjectURL(file) : null;
    setSubImagesPreview(updatedPreview);
  };

  // --- Itinerary Handlers ---
  const handleAddItinerary = () => {
    setItineraries([
      ...itineraries,
      { day_title: `Day ${itineraries.length + 1}`, description: "", includeToggle: false, includedItems: [], excludedItems: [] },
    ]);
  };

  const handleItineraryChange = (index, field, value) => {
    const updated = [...itineraries];
    updated[index][field] = value;
    setItineraries(updated);
  };

  const handleIncludeToggle = (index) => {
    const updated = [...itineraries];
    updated[index].includeToggle = !updated[index].includeToggle;
    setItineraries(updated);
  };

  const addIncludeItem = (index, e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      const updated = [...itineraries];
      updated[index].includedItems.push(e.target.value.trim());
      setItineraries(updated);
      e.target.value = "";
    }
  };

  const removeIncludeItem = (itIndex, itemIndex) => {
    const updated = [...itineraries];
    updated[itIndex].includedItems.splice(itemIndex, 1);
    setItineraries(updated);
  };

  const addExcludeItem = (index, e) => {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      e.preventDefault();
      const updated = [...itineraries];
      updated[index].excludedItems.push(e.target.value.trim());
      setItineraries(updated);
      e.target.value = "";
    }
  };

  const removeExcludeItem = (itIndex, itemIndex) => {
    const updated = [...itineraries];
    updated[itIndex].excludedItems.splice(itemIndex, 1);
    setItineraries(updated);
  };

  

  // --- Submit Handler ---
 const handleSubmit = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("is_new_package", isNewPackage);

  if (isNewPackage) {
    formData.append("title", title);
    formData.append("total_days", totalDays);
    formData.append("description", description);
    if (mainImage) formData.append("main_image", mainImage);
    subImages.forEach((img, idx) => img && formData.append(`sub_image${idx + 1}`, img));
  } else {
    formData.append("existing_package_id", selectedPackage);
  }

  // Map keys to match backend
  const payloadItineraries = itineraries.map(it => ({
    day_title: it.day_title,
    description: it.description,
    include_toggle: it.includeToggle,
    included_items: it.includedItems,
    excluded_items: it.excludedItems,
  }));

  formData.append("itineraries", JSON.stringify(payloadItineraries));

  try {
    const token = localStorage.getItem("admin_token");
    await api.post("/admin-packages", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });

    alert("Tour Package / Itineraries Added Successfully!");

    // Reset Form
    if (isNewPackage) {
      setTitle("");
      setTotalDays(1);
      setDescription("");
      setMainImage(null);
      setMainImagePreview(null);
      setSubImages([null, null, null, null]);
      setSubImagesPreview([null, null, null, null]);
    }

    setItineraries([{ day_title: "Day 1", description: "", includeToggle: false, includedItems: [], excludedItems: [] }]);
  } catch (err) {
    console.error(err);
    alert(err.response?.data?.message || "Error adding tour package!");
  }
};


  

  return (
    <>
      <Admin_Nav />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#313041] mt-20 mb-10 text-center sm:text-left">
          {isNewPackage ? "Add New Tour Package" : "Add Itineraries to Existing Package"}
        </h2>

        {/* New / Existing Toggle */}
        <div className="flex items-center gap-3 mb-6">
          <input
            type="checkbox"
            checked={isNewPackage}
            onChange={() => setIsNewPackage(!isNewPackage)}
            id="newPackageToggle"
            className="w-5 h-5 accent-blue-600"
          />
          <label htmlFor="newPackageToggle" className="text-gray-700 font-medium">
            Create New Package
          </label>
        </div>

        

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Existing Package Dropdown */}
          {!isNewPackage && (
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
              <label className="w-full sm:w-1/4 font-medium text-gray-700">Select Package</label>
              <select
                value={selectedPackage}
                onChange={(e) => setSelectedPackage(e.target.value)}
                className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition duration-200"
              >
                {existingPackages.map((pkg) => (
                  <option key={pkg.id} value={pkg.id}>
                    {pkg.title}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* New Package Fields */}
          {isNewPackage && (
            <>
              {/* Title */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                <label className="w-full sm:w-1/4 font-medium text-gray-700">Package Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  placeholder="Enter Package Title"
                  className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition duration-200"
                />
              </div>

              {/* Total Days */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
                <label className="w-full sm:w-1/4 font-medium text-gray-700">Total Days</label>
                <input
                  type="number"
                  min={1}
                  value={totalDays}
                  onChange={(e) => setTotalDays(e.target.value)}
                  required
                  className="w-full sm:w-24 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition duration-200"
                />
              </div>

              {/* Description */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:gap-6">
                <label className="w-full sm:w-1/4 font-medium text-gray-700 mt-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  required
                  placeholder="Write a detailed description..."
                  className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm transition duration-200 resize-none"
                />
              </div>

              {/* Images */}
              <div>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Images</h3>
                <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
                  {/* Main Image */}
                  <div className="flex flex-col items-center">
                    <label className="font-medium mb-1 text-gray-600">Main Image</label>
                    <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                      Choose Image
                      <input
                        type="file"
                        className="hidden"
                        onChange={(e) => handleMainImageChange(e.target.files[0])}
                      />
                    </label>
                    {mainImagePreview && (
                      <img src={mainImagePreview} alt="Main Preview" className="mt-2 w-32 h-20 object-cover rounded-md" />
                    )}
                    {mainImage && <span className="mt-1 text-sm text-gray-700">{mainImage.name}</span>}
                  </div>

                  {/* Sub Images */}
                  {subImages.map((img, idx) => (
                    <div key={idx} className="flex flex-col items-center">
                      <label className="font-medium mb-1 text-gray-600">Sub Image {idx + 1}</label>
                      <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                        Choose Image
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleSubImageChange(idx, e.target.files[0])}
                        />
                      </label>
                      {subImagesPreview[idx] && (
                        <img
                          src={subImagesPreview[idx]}
                          alt={`Sub Preview ${idx + 1}`}
                          className="mt-2 w-32 h-20 object-cover rounded-md"
                        />
                      )}
                      {img && <span className="mt-1 text-sm text-gray-700">{img.name}</span>}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Itineraries */}
          <div className="border-l-4 border-blue-600 bg-blue-50 p-6 rounded-lg space-y-4">
            <h3 className="font-semibold text-xl text-[#313041] mb-2">Itineraries</h3>
            {itineraries.map((it, idx) => (
              <div key={idx} className="grid grid-cols-1 sm:grid-cols-12 gap-4 border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-md transition duration-200">
                <label className="col-span-12 sm:col-span-3 font-medium text-gray-700">Day Title</label>
                <input
                  type="text"
                  value={it.day_title}
                  onChange={(e) => handleItineraryChange(idx, "day_title", e.target.value)}
                  className="col-span-12 sm:col-span-9 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-transparent shadow-sm transition duration-200"
                />

                <label className="col-span-12 sm:col-span-3 font-medium text-gray-700 mt-2 sm:mt-0">Description</label>
                <textarea
                  value={it.description}
                  onChange={(e) => handleItineraryChange(idx, "description", e.target.value)}
                  rows={3}
                  placeholder="Write itinerary details..."
                  className="col-span-12 sm:col-span-9 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-300 focus:border-transparent shadow-sm transition duration-200 resize-none"
                />

                {/* Include / Exclude Toggle */}
                <div className="col-span-12 flex items-center gap-3 mt-2">
                  <label className="font-medium text-gray-700">Add Include/Exclude</label>
                  <input
                    type="checkbox"
                    checked={it.includeToggle}
                    onChange={() => handleIncludeToggle(idx)}
                    className="w-5 h-5 accent-blue-600"
                  />
                </div>

                {/* Include / Exclude Lists */}
                {it.includeToggle && (
                  <div className="col-span-12 grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    {/* Include List */}
                    <div>
                      <label className="font-medium text-gray-700">Include</label>
                      <input
                        type="text"
                        placeholder="Press Enter to add"
                        onKeyDown={(e) => addIncludeItem(idx, e)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-green-400 focus:border-transparent shadow-sm transition duration-200"
                      />
                      <ul className="mt-2 space-y-1">
                        {it.includedItems.map((item, i) => (
                          <li key={i} className="flex items-center justify-between bg-green-100 px-2 py-1 rounded-md">
                            <div className="flex items-center gap-1"><Check size={16} /> {item}</div>
                            <button type="button" onClick={() => removeIncludeItem(idx, i)}>X</button>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Exclude List */}
                    <div>
                      <label className="font-medium text-gray-700">Exclude</label>
                      <input
                        type="text"
                        placeholder="Press Enter to add"
                        onKeyDown={(e) => addExcludeItem(idx, e)}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-red-400 focus:border-transparent shadow-sm transition duration-200"
                      />
                      <ul className="mt-2 space-y-1">
                        {it.excludedItems.map((item, i) => (
                          <li key={i} className="flex items-center justify-between bg-red-100 px-2 py-1 rounded-md">
                            <div className="flex items-center gap-1"><X size={16} /> {item}</div>
                            <button type="button" onClick={() => removeExcludeItem(idx, i)}>X</button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}

            <button
              type="button"
              onClick={handleAddItinerary}
              className="mt-2 inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-md transition duration-200"
            >
              + Add Another Day
            </button>
          </div>

          {/* Submit */}
          <div className="text-center sm:text-right">
            <button
              type="submit"
              className="bg-[#024360] text-white px-6 py-3 rounded-lg hover:text-[#75798B] shadow-md transition duration-200 text-lg font-medium"
            >
              {isNewPackage ? "Add Tour Package" : "Add Itineraries"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

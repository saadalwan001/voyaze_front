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
  const [enabled, setEnabled] = useState(true);

  // Pricing fields
  const [adultSinglePrice, setAdultSinglePrice] = useState(0);
  const [childSinglePrice, setChildSinglePrice] = useState(0);
  const [adultGroupPricing, setAdultGroupPricing] = useState([]);
  const [childGroupPricing, setChildGroupPricing] = useState([]);

  // Images
  const [mainImage, setMainImage] = useState(null);
  const [mainImagePreview, setMainImagePreview] = useState(null);
  const [subImages, setSubImages] = useState([null, null, null, null]);
  const [subImagesPreview, setSubImagesPreview] = useState([
    null,
    null,
    null,
    null,
  ]);

  // Items
  const [includedItems, setIncludedItems] = useState([]);
  const [excludedItems, setExcludedItems] = useState([]);

  // Relationships
  const [itineraries, setItineraries] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [allAttractions, setAllAttractions] = useState([]);

  // Fetch existing package and all attractions
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("admin_token");

        // Fetch package data
        const res = await api.get(`/admin-packages/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const pkg = res.data;

        setTitle(pkg.title);
        setTotalDays(pkg.total_days);
        setDescription(pkg.description);
        setEnabled(pkg.enabled);

        // Pricing
        setAdultSinglePrice(pkg.adult_single_price || 0);
        setChildSinglePrice(pkg.child_single_price || 0);
        setAdultGroupPricing(pkg.adult_group_pricing || []);
        setChildGroupPricing(pkg.child_group_pricing || []);

        // Images
        setMainImagePreview(pkg.main_image || null);
        setSubImagesPreview([
          pkg.sub_image1 || null,
          pkg.sub_image2 || null,
          pkg.sub_image3 || null,
          pkg.sub_image4 || null,
        ]);

        // Items
        setIncludedItems(pkg.included_items || []);
        setExcludedItems(pkg.excluded_items || []);

        // Relationships
        setItineraries(pkg.itineraries || []);
        setAttractions(pkg.attractions ? pkg.attractions.map((a) => a.id) : []);

        // Fetch all attractions for selection
        const attractionsRes = await api.get("/admin-attractions");
        setAllAttractions(attractionsRes.data);
      } catch (err) {
        console.error(err);
        alert("Error fetching data.");
      }
    };

    fetchData();
  }, [id]);

  // Image handlers
  const handleMainImageChange = (file) => {
    setMainImage(file);
    setMainImagePreview(file ? URL.createObjectURL(file) : null);
  };

  const handleSubImageChange = (index, file) => {
    const updated = [...subImages];
    updated[index] = file;
    setSubImages(updated);

    const updatedPreview = [...subImagesPreview];
    updatedPreview[index] = file
      ? URL.createObjectURL(file)
      : updatedPreview[index];
    setSubImagesPreview(updatedPreview);
  };

  // Include / Exclude handlers
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

  // Itinerary handlers
  const updateItinerary = (index, key, value) => {
    const updated = [...itineraries];
    updated[index] = { ...updated[index], [key]: value };
    setItineraries(updated);
  };

  const addItinerary = () => {
    setItineraries([
      ...itineraries,
      { day_title: "", description: "", include_toggle: false },
    ]);
  };

  const removeItinerary = (index) => {
    const updated = [...itineraries];
    updated.splice(index, 1);
    setItineraries(updated);
  };

  // Group pricing handlers
  const addGroupPricing = (type) => {
    const newPricing = { min_people: 2, max_people: null, price_per_person: 0 };
    if (type === "adult") {
      setAdultGroupPricing([...adultGroupPricing, newPricing]);
    } else {
      setChildGroupPricing([...childGroupPricing, newPricing]);
    }
  };

  const updateGroupPricing = (type, index, key, value) => {
    if (type === "adult") {
      const updated = [...adultGroupPricing];
      updated[index][key] = value;
      setAdultGroupPricing(updated);
    } else {
      const updated = [...childGroupPricing];
      updated[index][key] = value;
      setChildGroupPricing(updated);
    }
  };

  const removeGroupPricing = (type, index) => {
    if (type === "adult") {
      const updated = [...adultGroupPricing];
      updated.splice(index, 1);
      setAdultGroupPricing(updated);
    } else {
      const updated = [...childGroupPricing];
      updated.splice(index, 1);
      setChildGroupPricing(updated);
    }
  };

  // Attraction handlers
  const handleAttractionChange = (attractionId) => {
    setAttractions((prev) => {
      if (prev.includes(attractionId)) {
        return prev.filter((id) => id !== attractionId);
      } else {
        return [...prev, attractionId];
      }
    });
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("total_days", totalDays);
    formData.append("description", description);
    formData.append("enabled", enabled);
    formData.append("adult_single_price", adultSinglePrice);
    formData.append("child_single_price", childSinglePrice);
    formData.append("included_items", JSON.stringify(includedItems));
    formData.append("excluded_items", JSON.stringify(excludedItems));
    formData.append("itineraries", JSON.stringify(itineraries));
    formData.append("attractions", JSON.stringify(attractions));
    formData.append("adult_group_pricing", JSON.stringify(adultGroupPricing));
    formData.append("child_group_pricing", JSON.stringify(childGroupPricing));

    if (mainImage) formData.append("main_image", mainImage);
    subImages.forEach(
      (img, idx) => img && formData.append(`sub_image${idx + 1}`, img)
    );

    try {
      const token = localStorage.getItem("admin_token");
      await api.patch(`/admin-packages/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
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
          {/* Basic Info */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <label className="w-full sm:w-1/4 font-medium text-gray-700">
              Package Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 shadow-sm"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <label className="w-full sm:w-1/4 font-medium text-gray-700">
              Total Days
            </label>
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
            <label className="w-full sm:w-1/4 font-medium text-gray-700 mt-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              className="w-full sm:w-3/4 border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-400 shadow-sm resize-none"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6">
            <label className="w-full sm:w-1/4 font-medium text-gray-700">
              Status
            </label>
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={enabled}
                  onChange={(e) => setEnabled(e.target.checked)}
                />
                <div
                  className={`block w-14 h-7 rounded-full ${
                    enabled ? "bg-green-400" : "bg-gray-400"
                  }`}
                ></div>
                <div
                  className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform ${
                    enabled ? "transform translate-x-7" : ""
                  }`}
                ></div>
              </div>
              <span className="ml-3 text-gray-700">
                {enabled ? "Enabled" : "Disabled"}
              </span>
            </label>
          </div>

          {/* Pricing */}
          <div className="border p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Pricing
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="font-medium text-gray-700">
                  Adult Single Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={adultSinglePrice}
                  onChange={(e) => setAdultSinglePrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 shadow-sm"
                />
              </div>

              <div>
                <label className="font-medium text-gray-700">
                  Child Single Price
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={childSinglePrice}
                  onChange={(e) => setChildSinglePrice(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-400 shadow-sm"
                />
              </div>
            </div>

            {/* Adult Group Pricing */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-700">
                  Adult Group Pricing
                </h4>
                <button
                  type="button"
                  onClick={() => addGroupPricing("adult")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  Add Tier
                </button>
              </div>

              {adultGroupPricing.map((pricing, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 p-3 border rounded-md"
                >
                  <div>
                    <label className="text-sm text-gray-600">Min People</label>
                    <input
                      type="number"
                      min="2"
                      value={pricing.min_people}
                      onChange={(e) =>
                        updateGroupPricing(
                          "adult",
                          idx,
                          "min_people",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Max People (optional)
                    </label>
                    <input
                      type="number"
                      min={pricing.min_people + 1}
                      value={pricing.max_people || ""}
                      onChange={(e) =>
                        updateGroupPricing(
                          "adult",
                          idx,
                          "max_people",
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Price per Person
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={pricing.price_per_person}
                      onChange={(e) =>
                        updateGroupPricing(
                          "adult",
                          idx,
                          "price_per_person",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeGroupPricing("adult", idx)}
                      className="bg-red-500 text-white px-3 py-2 rounded-md text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Child Group Pricing */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h4 className="font-medium text-gray-700">
                  Child Group Pricing
                </h4>
                <button
                  type="button"
                  onClick={() => addGroupPricing("child")}
                  className="bg-blue-500 text-white px-3 py-1 rounded-md text-sm"
                >
                  Add Tier
                </button>
              </div>

              {childGroupPricing.map((pricing, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-3 p-3 border rounded-md"
                >
                  <div>
                    <label className="text-sm text-gray-600">Min People</label>
                    <input
                      type="number"
                      min="2"
                      value={pricing.min_people}
                      onChange={(e) =>
                        updateGroupPricing(
                          "child",
                          idx,
                          "min_people",
                          parseInt(e.target.value)
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Max People (optional)
                    </label>
                    <input
                      type="number"
                      min={pricing.min_people + 1}
                      value={pricing.max_people || ""}
                      onChange={(e) =>
                        updateGroupPricing(
                          "child",
                          idx,
                          "max_people",
                          e.target.value ? parseInt(e.target.value) : null
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-600">
                      Price per Person
                    </label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={pricing.price_per_person}
                      onChange={(e) =>
                        updateGroupPricing(
                          "child",
                          idx,
                          "price_per_person",
                          parseFloat(e.target.value)
                        )
                      }
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm"
                    />
                  </div>
                  <div className="flex items-end">
                    <button
                      type="button"
                      onClick={() => removeGroupPricing("child", idx)}
                      className="bg-red-500 text-white px-3 py-2 rounded-md text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
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
                  <li
                    key={i}
                    className="flex items-center justify-between bg-green-100 px-2 py-1 rounded-md"
                  >
                    <div className="flex items-center gap-1">
                      <Check size={16} /> {item}
                    </div>
                    <button type="button" onClick={() => removeIncludeItem(i)}>
                      X
                    </button>
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
                  <li
                    key={i}
                    className="flex items-center justify-between bg-red-100 px-2 py-1 rounded-md"
                  >
                    <div className="flex items-center gap-1">
                      <X size={16} /> {item}
                    </div>
                    <button type="button" onClick={() => removeExcludeItem(i)}>
                      X
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Itineraries */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Itineraries
            </h3>
            {itineraries.map((it, idx) => (
              <div key={idx} className="border p-3 rounded-lg mb-3">
                <input
                  type="text"
                  placeholder="Day Title"
                  value={it.day_title}
                  onChange={(e) =>
                    updateItinerary(idx, "day_title", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2"
                />
                <textarea
                  placeholder="Description"
                  value={it.description}
                  onChange={(e) =>
                    updateItinerary(idx, "description", e.target.value)
                  }
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-2 resize-none"
                />
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={it.include_toggle || false}
                    onChange={(e) =>
                      updateItinerary(idx, "include_toggle", e.target.checked)
                    }
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
            <button
              type="button"
              onClick={addItinerary}
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Add Day
            </button>
          </div>

          {/* Attractions */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">
              Attractions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {allAttractions.map((attraction) => (
                <label
                  key={attraction.id}
                  className="flex items-center p-2 border rounded-md cursor-pointer hover:bg-gray-50"
                >
                  <input
                    type="checkbox"
                    checked={attractions.includes(attraction.id)}
                    onChange={() => handleAttractionChange(attraction.id)}
                    className="mr-2"
                  />
                  {attraction.name}
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Images</h3>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              <div className="flex flex-col items-center">
                <label className="font-medium mb-1 text-gray-600">
                  Main Image
                </label>
                <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                  Choose Image
                  <input
                    type="file"
                    className="hidden"
                    onChange={(e) => handleMainImageChange(e.target.files[0])}
                  />
                </label>
                {mainImagePreview && (
                  <img
                    src={mainImagePreview}
                    alt="Main Preview"
                    className="mt-2 w-32 h-20 object-cover rounded-md"
                  />
                )}
              </div>
              {subImages.map((img, idx) => (
                <div key={idx} className="flex flex-col items-center">
                  <label className="font-medium mb-1 text-gray-600">
                    Sub Image {idx + 1}
                  </label>
                  <label className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-700">
                    Choose Image
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) =>
                        handleSubImageChange(idx, e.target.files[0])
                      }
                    />
                  </label>
                  {subImagesPreview[idx] && (
                    <img
                      src={subImagesPreview[idx]}
                      alt={`Sub Preview ${idx + 1}`}
                      className="mt-2 w-32 h-20 object-cover rounded-md"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="text-center sm:text-right">
            <button
              type="submit"
              className="bg-[#024360] text-white px-6 py-3 rounded-lg hover:text-[#75798B] shadow-md transition duration-200 text-lg font-medium"
            >
              Update Tour Package
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "@/utlis/axios.js";

function AttractionTourPackages({ attractionId }) {
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    if (attractionId) {
      api.get(`/attractions/${attractionId}/tour-packages`)
        .then((res) => setPackages(res.data))
        .catch((err) => console.error("Error fetching packages:", err));
    }
  }, [attractionId]);

  if (packages.length === 0) {
    return <p className="text-center py-8 text-gray-500">No tour packages available for this location.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 my-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Suggested Tour Packages
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {packages.map((pkg) => (
          <Link
          to={`/package/${pkg.id}`} 
          key={pkg.id}
          className="block rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 bg-white"
        >
            <div
              className="h-48 bg-cover bg-center"
              style={{
                backgroundImage: `url(${import.meta.env.VITE_API_URL.replace(
                  "/api",
                  ""
                )}${pkg.main_image})`,
              }}
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 hover:text-blue-600">
                {pkg.title}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-3">
                {pkg.description}
              </p>
              <p className="mt-2 text-sm font-medium text-blue-600">
                {pkg.total_days} Days
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AttractionTourPackages;

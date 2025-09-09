import React, { useEffect, useState } from "react";
import api from "@/utlis/axios.js";
import { useNavigate } from "react-router-dom";

function ImageGrid() {
  const [attractions, setAttractions] = useState([]);
  const navigate = useNavigate();

  // Fetch all attractions
  useEffect(() => {
    api.get("/attractions")
      .then((res) => setAttractions(res.data))
      .catch((err) => console.error("Error fetching attractions:", err));
  }, []);

  const handleClick = (id) => {
    navigate(`/location/${id}`);
  };

  return (
    <section className="py-16 px-4 md:px-12 bg-gray-50 text-center max-w-7xl mx-auto sm:px-6 lg:px-8 ">
      <h3 className="text-lg md:text-xl text-gray-500 mb-2">
        Explore the Beauty of the Island Paradise
      </h3>
      <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
        Top Destinations in Sri Lanka
      </h2>
      <div className="w-20 h-1 mx-auto bg-[#313d44] mb-6 rounded"></div>
      <p className="max-w-3xl mx-auto text-gray-600 mb-12">
        Discover Sri Lanka's most breathtaking locations – from serene beaches and misty hill country to ancient cities and wildlife escapes. Perfect spots for every kind of traveler.
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-[25px]">
        {attractions.map((dest, index) => (
          <div
            key={dest.id}
            onClick={() => handleClick(dest.id)}
            className={`relative h-[400px] rounded-xl overflow-hidden shadow-md transition-transform duration-300 cursor-pointer hover:-translate-y-2 ${
              (index % 4 === 0 || index % 4 === 2) ? 'mt-0 md:-mt-8' : ''
            }`}
          >
            <div
              className="absolute inset-0 bg-cover bg-center transition-transform duration-10000 hover:scale-110"
              style={{
                backgroundImage: `url(${import.meta.env.VITE_API_URL.replace('/api', '')}${dest.front_img})`
              }}
            ></div>
            <div className="absolute bottom-0 w-full text-white font-medium text-2xl md:text-1xl py-2">
              {dest.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ImageGrid;

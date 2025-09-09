import React, { useEffect, useState } from "react";
import api from "@/utlis/axios.js";
import { useNavigate } from "react-router-dom";

function ImageGrid() {
  const [attractions, setAttractions] = useState([]);
  const navigate = useNavigate();

//to fetch only latest first six 
  useEffect(() => {
  api.get("/attractions/latest")
    .then((res) => setAttractions(res.data))
    .catch((err) => console.error("Error fetching latest attractions:", err));
}, []);

const handleClick = (id) => {
    // Navigate to location page (replace "/location" with your route)
    navigate(`/location/${id}`);
  };


  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10">

      <h3 className="text-lg sm:text-xl md:text-2xl text-gray-500 mb-2">
        Things To Do
      </h3>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-10">
        Attractions And <br /> Experiences
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {attractions.map((dest) => (
          <div
            key={dest.id}
            onClick={() => handleClick(dest.id)}
            className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:scale-105 cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL.replace('/api', '')}${dest.front_img})` }}
              
            ></div>
            <div className="absolute bottom-0 w-full text-white font-medium text-lg sm:text-xl md:text-2xl py-2">
              {dest.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ImageGrid;

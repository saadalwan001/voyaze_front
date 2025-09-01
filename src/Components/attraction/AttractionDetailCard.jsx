import React from "react";

function AttractionDetailCard({ title, description, back_img }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 my-10 mt-[100px]">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
        {/* Left Image */}
        <div className="w-full md:w-1/2 h-64 md:h-96 rounded-lg overflow-hidden shadow-lg">
          <img
            src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${back_img}`}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="w-full md:w-1/2">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            {title}
          </h2>
          <p className="text-gray-600 text-base sm:text-lg md:text-xl">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default AttractionDetailCard;

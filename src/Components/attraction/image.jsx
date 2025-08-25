import React from 'react';

const img = [
  { id: 1, title: "Wildlife Safaris", image: "safri.jpg" },
  { id: 2, title: "Surfing", image: "surfing.jpg" },
  { id: 3, title: "Tea Plantations Visit", image: "tea.jpg" },
  { id: 4, title: "Local Food Experiences", image: "food.jpg" },
  { id: 5, title: "Scenic Train Rides", image: "train.jpg" },
  { id: 6, title: "Cultural Heritage Temples", image: "temple.webp" },
];

function ImageGrid() {
  return (
    <section className="py-16 px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 2xl:px-32 text-center">
      <h3 className="text-lg sm:text-xl md:text-2xl text-gray-500 mb-2">
        Things To Do
      </h3>
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800 mb-10">
        Attractions And <br /> Experiences
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6">
        {img.map((dest) => (
          <div
            key={dest.id}
            className="relative w-full h-64 sm:h-72 md:h-80 lg:h-96 xl:h-96 2xl:h-96 rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 hover:scale-105"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${dest.image})` }}
            ></div>
            <div className="absolute bottom-0 w-full  text-white font-medium text-lg sm:text-xl md:text-2xl py-2">
              {dest.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ImageGrid;

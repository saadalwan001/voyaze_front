import React from 'react';

const destinations = [
  { id: 1, title: 'Anuradhapura', image: '/anuradapura.jpg' },
  { id: 2, title: 'Dambulla', image: '/Dambulla.jpg' },
  { id: 3, title: 'Bentota', image: '/Bentota.jpg' },
  { id: 4, title: 'Sigiriya', image: '/Sigiriya.jpg' },
  { id: 5, title: 'Colombo', image: '/colombo.jpg' },
  { id: 6, title: 'Nuwara Eliya', image: '/nuwara_eliya.jpg' },
  { id: 7, title: 'Galle', image: '/galle.jpg' },
  { id: 8, title: 'Arugam Bay', image: '/arugambay.jpg' },
];

const DesSection = () => {
  return (
    <section className="bg-gray-50 py-16">
      {/* Main wrapper to align with your specific padding/margin */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-lg md:text-xl text-gray-500 mb-2">
          Explore the Beauty of the Island Paradise
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Top Destinations in Sri Lanka
        </h2>
        <div className="w-20 h-1 mx-auto bg-[#313d44] mb-6 rounded"></div>
        <p className="max-w-xl mx-auto text-gray-600 mb-12">
          Discover Sri Lanka's most breathtaking locations – from serene beaches and misty hill country to ancient cities and wildlife escapes. Perfect spots for every kind of traveler.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-[25px]">
          {destinations.map((dest, index) => (
            <div
              key={dest.id}
              className={`relative h-[400px] rounded-xl overflow-hidden shadow-md transition-transform duration-300 hover:-translate-y-2 ${
                (index % 4 === 0 || index % 4 === 2) ? 'mt-0 md:-mt-8' : ''
              }`}
            >
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${dest.image})` }}
              ></div>
              <div className="absolute bottom-0 w-full bg-opacity-50 text-white font-medium text-2xl md:text-1xl py-2 text_style">
                {dest.title}
              </div>
            </div>
          ))}
        </div>

        <button className="bg-[#03567F] text-white font-medium text-md px-[30px] py-[15px] w-fit rounded hover:bg-[#03567F] transition-all cursor-pointer">
          More Destinations &nbsp; →
        </button>
      </div>
    </section>
  );
};

export default DesSection;

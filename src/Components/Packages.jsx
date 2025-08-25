import React from "react";
import { Clock } from "lucide-react";

const packages = [
  {
    id: 1,
    title: "Sri Lanka Scenic Train Odyssey",
    image: "/Sigiriya.jpg",
    duration: "7 Days",
    description:
      "A 7-Day Journey Through Sri Lanka's Cultural Gems and Scenic Rails. This 7-day tour celebrates Sri Lanka's rich heritage,...",
  },
  {
    id: 2,
    title: "Majestic Sri Lanka Heritage Trail",
    image: "/parahara.jpg",
    duration: "9 Days",
    description:
      "9-Day Odyssey Through Sri Lanka's Cultural And Natural Splendors Crafted For Travelers From India And Beyond, this 9 day tour...",
  },
  {
    id: 3,
    title: "Sri Lanka Cultural and Coastal Quest",
    image: "/colombo.jpg",
    duration: "5 Days",
    description:
      "Embark on a captivating 5-days journey trailored for travelers from India and beyond, showcasing Sri Lanka's vibrant...",
  },
];

const Packages = () => {
  return (
    <section className="bg-gray-50 py-16">
      {/* Main wrapper to match the specific padding/margin */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl md:text-2xl text-gray-700 mb-2">
          Crafted For Every Kind Of Traveller
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Our Tour Packages
        </h2>
        <div className="w-20 h-2 mx-auto bg-[#313d44] mb-10 rounded"></div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 min-h-[400px]"
            >
              {/* Image with zoom hover */}
              <div className="h-56 overflow-hidden flex justify-center items-center mt-[20px]">
                <div className="w-[300px] h-[300px] transition-transform duration-1500 hover:scale-105">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="p-6 text-left">
                <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-2">
                  {pkg.title}
                </h3>

                <div className="flex items-center text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4 mr-2" />
                  {pkg.duration}
                </div>

                <p className="text-gray-600 text-justify leading-relaxed">
                  {pkg.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <button className="bg-[#03567F] text-white text-sm px-[20px] py-[15px] w-fit rounded hover:bg-[#024360] transition-all mt-12">
          MORE PACKAGES &nbsp; →
        </button>
      </div>
    </section>
  );
};

export default Packages;

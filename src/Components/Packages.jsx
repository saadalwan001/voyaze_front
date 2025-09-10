import React, { useEffect, useState } from "react";
import { Clock } from "lucide-react";
import api from "@/utlis/axios.js";
import { useNavigate, Link } from "react-router-dom";

const Packages = () => {
  const navigate = useNavigate();
  const [packages, setPackages] = useState([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await api.get("/latest-packages");
        setPackages(res.data);
      } catch (err) {
        console.error("Error fetching packages:", err);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-xl md:text-2xl text-gray-700 mb-2">
          Crafted For Every Kind Of Traveller
        </h3>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Our Tour Packages
        </h2>
        <div className="w-20 h-2 mx-auto bg-[#313d44] mb-10 rounded"></div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Link key={pkg.id} to={`/package/${pkg.id}`} className="block">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 min-h-[400px] ease-in-out">
                {/* Image */}
                <div className="h-56 overflow-hidden flex justify-center items-center mt-[20px]">
                  <div className="w-[300px] h-[300px] transition-transform duration-1500 hover:scale-105">
                    <img
                      src={`${
                        import.meta.env.VITE_API_URL.replace("/api", "") +
                        pkg.main_image
                      }`}
                      alt={pkg.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 text-left">
                  <h3 className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors duration-200 mb-2">
                    {pkg.title}
                  </h3>

                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Clock className="w-4 h-4 mr-2" />
                    {pkg.total_days} Days
                  </div>

                  <p className="text-gray-600 text-justify leading-relaxed">
                    {pkg.description?.substring(0, 120)}...
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <button
          className="bg-[#03567F] text-white text-sm px-[20px] py-[15px] w-fit rounded hover:bg-[#024360] transition-all mt-12 hover:cursor-pointer"
          onClick={() => navigate("/tours")}
        >
          MORE PACKAGES &nbsp; →
        </button>
      </div>
    </section>
  );
};

export default Packages;

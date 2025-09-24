import React, { useEffect, useState } from "react";
import { Clock, Plus, Loader } from "lucide-react";
import api from "@/utlis/axios.js";
import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';

const PackagesTour = () => {
  const [packages, setPackages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { addToCart } = useCart();

  const fetchPackages = async (page = 1, append = false) => {
    setLoading(true);
    try {
      const res = await api.get(`/packages?page=${page}&per_page=3`);
      const newPackages = res.data.data;
      
      if (append) {
        setPackages(prev => [...prev, ...newPackages]);
      } else {
        setPackages(newPackages);
      }
      
      setHasMore(res.data.current_page < res.data.last_page);
      setCurrentPage(res.data.current_page);
    } catch (err) {
      console.error("Error fetching packages:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages(1, false);
  }, []);

  const loadMore = () => {
    fetchPackages(currentPage + 1, true);
  };

  const handleAddToCart = (pkg, e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(pkg, 1, 0); // Default: 1 adult, 0 children
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <div key={pkg.id} className="bg-white rounded-xl shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 min-h-[400px] relative">
              {/* Add to Cart Button */}
              <button
                onClick={(e) => handleAddToCart(pkg, e)}
                className="absolute top-4 right-4 z-10 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg"
                title="Add to cart"
              >
                <Plus className="w-5 h-5" />
              </button>

              <Link to={`/package/${pkg.id}`}>
                {/* Image */}
                <div className="h-56 overflow-hidden flex justify-center items-center mt-5">
                  <div className="w-[300px] h-[300px] transition-transform duration-500 hover:scale-105">
                    <img
                      src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${pkg.main_image}`}
                      alt={pkg.title}
                      className="w-full h-full object-cover hover:scale-105 duration-300 transition-transform ease-in-out"
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

                  {/* Price */}
                  <div className="mt-4 flex justify-between items-center">
                    <div>
                      <span className="text-lg font-semibold text-blue-600">
                        ${pkg.adult_single_price || 0}
                      </span>
                      <span className="text-sm text-gray-500 ml-2">per adult</span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center">
            <button
              onClick={loadMore}
              disabled={loading}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 mr-2 animate-spin" />
                  Loading...
                </>
              ) : (
                'Load More Packages'
              )}
            </button>
          </div>
        )}

        {!hasMore && packages.length > 0 && (
          <p className="text-gray-500">All packages loaded</p>
        )}
      </div>
    </section>
  );
};

export default PackagesTour;
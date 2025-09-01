import React, { useState, useEffect, useRef } from "react";
import api from "@/utlis/axios.js";

export default function AttractionSlider() {
  const [attractions, setAttractions] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(4);
  const timeoutRef = useRef(null);

  
  useEffect(() => {
    api.get("/attractions")
      .then((res) => setAttractions(res.data))
      .catch((err) => console.error("Error fetching attractions:", err));
  }, []);


  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else if (window.innerWidth < 1280) setVisibleCards(3);
      else setVisibleCards(4);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalCards = attractions.length;
  const maxIndex = totalCards - visibleCards >= 0 ? totalCards - visibleCards : 0;

  
  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      setActiveIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
    }, 6000);
    return () => resetTimeout();
  }, [activeIndex, maxIndex]);

  function resetTimeout() {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }

  const prevSlide = () => setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  const nextSlide = () => setActiveIndex((prev) => (prev === maxIndex ? 0 : prev + 1));

 
  const cardWidth = 300; 
  const cardMarginX = 16; 
  const cardTotalWidth = cardWidth + cardMarginX * 2;

  return (
    <section className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
     
        
        <h3 className="text-xl md:text-4xl font-bold text-gray-800 mb-20">
          Most Popular Destination
        </h3>
        

        {/* slider */}
        <div className="flex justify-center relative">
          <div className="relative overflow-hidden" style={{ width: cardTotalWidth * visibleCards }}>
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                width: cardTotalWidth * totalCards,
                transform: `translateX(-${activeIndex * cardTotalWidth}px)`,
              }}
            >
              {attractions.map(({ id, title, front_img }) => (
                <div
                  key={id}
                  className="relative flex-shrink-0 mx-4 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                  style={{ width: cardWidth, height: 350 }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out hover:-translate-y-2"
                    style={{ backgroundImage: `url(${import.meta.env.VITE_API_URL.replace("/api", "")}${front_img})` }}
                  />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white text-xl font-semibold">{title}</h3>
                  </div>
                </div>
              ))}
            </div>

            
            <button
              onClick={prevSlide}
              className="absolute top-1/2 left-2 -translate-y-1/2 p-1 z-20"
              aria-label="Previous Slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-[#CAD9DC] hover:text-black transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

          
            <button
              onClick={nextSlide}
              className="absolute top-1/2 right-2 -translate-y-1/2 p-1 z-20"
              aria-label="Next Slide"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-7 w-7 text-[#CAD9DC] hover:text-black transition-colors"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            
          </div>
          {/* Pagination Dots  */}
            <div className="flex space-x-2 absolute bottom-[-20px] left-2 z-20  ">
              {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${idx === activeIndex ? "bg-black" : "bg-gray-400"}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
        </div>
      </div>
    </section>
  );
}

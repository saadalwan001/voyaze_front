import React, { useState, useEffect, useRef } from "react";

const cards = [
  { id: 1, title: "Wildlife Safaris", image: "safri.jpg" },
  { id: 2, title: "Surfing", image: "surfing.jpg" },
  { id: 3, title: "Tea Plantaions Visit", image: "tea.jpg" },
  { id: 4, title: "Local Food Experiences", image: "food.jpg" },
  { id: 5, title: "Scenic Train Rides", image: "train.jpg" },
  { id: 6, title: "Cultural Hertigate Temples", image: "temple.webp" },
];

export default function CardCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const timeoutRef = useRef(null);

  // Responsive visible cards
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 640) setVisibleCards(1);
      else if (window.innerWidth < 1024) setVisibleCards(2);
      else setVisibleCards(3);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalCards = cards.length;
  const maxIndex = totalCards - visibleCards;

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

  const cardWidth = 400; // px
  const cardMarginX = 16; // px
  const cardTotalWidth = cardWidth + cardMarginX * 2;

  return (
    <section className="bg-gray-50 py-16">
      {/* Wrapper to align with nav container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Title */}
        <h3 className="text-xl md:text-2xl text-gray-700 mb-2">Things To Do</h3>
        <h2 className="text-3xl md:text-5xl font-bold text-gray-800 mb-4">
          Attractions and Experiences
        </h2>
        <div className="w-30 h-2 mx-auto bg-[#313d44] mb-10 rounded"></div>

        {/* Carousel */}
        <div className="flex justify-center p-4">
          <div
            className="relative overflow-hidden"
            style={{ width: cardTotalWidth * visibleCards }}
          >
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{
                width: cardTotalWidth * totalCards,
                transform: `translateX(-${activeIndex * cardTotalWidth}px)`,
              }}
            >
              {cards.map(({ id, image, title }) => (
                <div
                  key={id}
                  className="relative flex-shrink-0 mx-4 rounded-lg overflow-hidden shadow-lg cursor-pointer"
                  style={{ width: cardWidth, height: 350 }}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 ease-in-out hover:-translate-y-2"
                    style={{ backgroundImage: `url(${image})` }}
                  />
                  <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h3 className="text-white text-xl font-semibold">{title}</h3>
                  </div>
                </div>
              ))}
            </div>

            {/* Left Arrow */}
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

            {/* Right Arrow */}
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

            {/* Pagination */}
            <div className="flex justify-center space-x-2 absolute bottom-2 left-1/2 -translate-x-1/2 w-full z-20">
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

        <button className="bg-[#03567F] text-white text-sm px-[20px] py-[15px] w-fit rounded hover:bg-[#024360] transition-all mt-12">
          MORE ATTRACTIONS &nbsp; →
        </button>
      </div>
    </section>
  );
}

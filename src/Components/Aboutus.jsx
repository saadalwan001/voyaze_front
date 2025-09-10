import React from "react";
import { useNavigate } from "react-router-dom";

export default function AboutUs() {

  const navigate=useNavigate();
  return (
    <section className="w-full py-16 bg-white mb-[80px]" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center items-center gap-8">
        
        {/* Left Side Image */}
        <div className="w-full md:w-1/2 lg:w-[470px] h-auto">
          <img
            src="/about_us_img.jpg"
            alt="About Us"
            className="w-full h-[600px] object-cover rounded-2xl"
          />
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-1/2 lg:w-[570px] flex flex-col justify-start gap-x-5 gap-y-3">
          
          {/* Logo */}
          <img
            src="/about_logo.png"
            alt="Voyaz Logo"
            className="w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] h-auto object-contain mb-4 -mt-7"
          />

          {/* Span Title */}
          <span className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-['playfair'] font-semibold text-[#353738] mb-2">
            Welcome to Voyaz Travel
          </span>

          {/* Divider Line */}
          <div
            className="mb-4"
            style={{ width: "80px", height: "5px", backgroundColor: "#757783" }}
          ></div>

          {/* Paragraphs */}
          <p className="text-gray-700 text-sm sm:text-base md:text-base mb-4">
            At <b>Voyaz Travel</b>, a trusted inbound Destination Management Company in Sri Lanka, we create unforgettable travel experiences for international visitors.
          </p>

          <p className="text-gray-700 text-sm sm:text-base md:text-base mb-4">
            With deep local expertise and a passion for sharing Sri Lanka's vibrant culture, stunning landscapes, and hidden gems, we craft tailor-made tours that capture the island's true spirit.
          </p>

          <p className="text-gray-700 text-sm sm:text-base md:text-base mb-6">
            From your arrival to departure, every detail is thoughtfully handled to ensure a seamless, immersive, and enriching journey – helping you experience Sri Lanka through the eyes of those who know it best.
          </p>

          {/* Button */}
          <button className="bg-[#03567F] text-white text-sm px-5 py-3 w-fit rounded hover:bg-[#024360] transition-all mt-5 hover:cursor-pointer"
          onClick={()=>navigate("/about")}>
            READ MORE &nbsp; →
          </button>
        </div>
      </div>
    </section>
  );
}

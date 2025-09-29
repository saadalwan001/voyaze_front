import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function AboutUs() {
  const navigate = useNavigate();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      className="w-full py-4 md:py-16 bg-white mb-[80px]"
      id="about"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-center items-center gap-8 md:gap-28">
        {/* Left Side Image */}
        <motion.div
          className="w-full md:w-1/2 lg:w-[470px] h-auto"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <img
            src="/about_us_img.jpg"
            alt="About Us"
            className="w-full h-[600px] object-cover rounded-2xl"
          />
        </motion.div>

        {/* Right Side Content */}
        <motion.div
          className="w-full md:w-1/2 lg:w-[570px] flex flex-col justify-start gap-x-5 gap-y-3"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        >
          {/* Logo */}
          <motion.img
            src="/about_logo.png"
            alt="Voyaz Logo"
            className="w-[100px] sm:w-[150px] md:w-[200px] lg:w-[250px] h-auto object-contain mb-4 -mt-7"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          />

          {/* Span Title */}
          <motion.span
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[45px] font-['playfair'] font-semibold text-[#353738] mb-2"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
          >
            Welcome to Voyaz Travel
          </motion.span>

          {/* Divider Line */}
          <motion.div
            className="mb-4"
            style={{ width: "80px", height: "5px", backgroundColor: "#757783" }}
            initial={{ width: 0 }}
            animate={isInView ? { width: "80px" } : { width: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          ></motion.div>

          {/* Paragraphs */}
          <motion.p
            className="text-gray-500 text-sm sm:text-base md:text-base mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          >
            At <b>Voyaz Travel</b>, a trusted inbound Destination Management
            Company in Sri Lanka, we create unforgettable travel experiences for
            international visitors.
          </motion.p>

          <motion.p
            className="text-gray-500 text-sm sm:text-base md:text-base mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          >
            With deep local expertise and a passion for sharing Sri Lanka's
            vibrant culture, stunning landscapes, and hidden gems, we craft
            tailor-made tours that capture the island's true spirit.
          </motion.p>

          <motion.p
            className="text-gray-500 text-sm sm:text-base md:text-base mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.9 }}
          >
            From your arrival to departure, every detail is thoughtfully handled
            to ensure a seamless, immersive, and enriching journey — helping you
            experience Sri Lanka through the eyes of those who know it best.
          </motion.p>

          {/* Button */}
          <motion.button
            className="bg-[#03567F] text-white text-sm px-5 py-3 w-fit rounded hover:bg-[#024360] transition-all mt-5 hover:cursor-pointer"
            onClick={() => navigate("/about")}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.0 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            READ MORE &nbsp; →
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

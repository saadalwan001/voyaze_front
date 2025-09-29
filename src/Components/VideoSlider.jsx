import React from "react";
import { motion } from "framer-motion";

export default function VideoBackgroundSection() {
  const videoId = "sprotb7pjOE";

  return (
    <section className="relative w-full h-screen overflow-hidden">
      {/* Background Image/Video Container */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Fallback Background Image for all devices */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`,
          }}
        ></div>

        {/* Video for larger screens only */}
        <div className="hidden lg:block absolute top-0 left-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&mute=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&playsinline=1&iv_load_policy=3`}
            title="Background Video"
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* Gradient overlay for depth */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>

      {/* Text Content - Centered */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="text-center text-white max-w-5xl">
          {/* Main Heading - Large and Bold */}
          <motion.h1 
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold leading-tight tracking-tight mb-4 sm:mb-6 md:mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              ease: "easeOut",
              delay: 0.3
            }}
          >
            <span className="block drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]">
              Where Every Step
            </span>
          </motion.h1>
          
          {/* Subheading - Elegant and Refined */}
          <motion.p 
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wide drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 1,
              ease: "easeOut",
              delay: 0.7
            }}
          >
            Tells A Story
          </motion.p>
        </div>

        {/* Optional: Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ 
            duration: 0.8,
            delay: 1.5
          }}
        >
          <motion.div 
            className="w-6 h-10 border-2 border-white/60 rounded-full flex items-start justify-center p-2"
            animate={{ y: [0, 10, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="w-1.5 h-3 bg-white/80 rounded-full"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
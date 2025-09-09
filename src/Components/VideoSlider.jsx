import React from "react";

export default function VideoBackgroundSection() {
  const videoId = "sprotb7pjOE";

  return (
    <section className="relative w-full min-h-screen overflow-hidden mb-12 sm:mb-16 md:mb-20">
      {/* Background Image/Video Container */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Fallback Background Image for all devices */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2074&q=80')`,
          }}
        ></div>

        {/* Video for larger screens only (where autoplay works better) */}
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

      {/* Additional overlay for better text contrast */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/20"></div>

      {/* Text Content */}
      <div className="relative z-10 flex items-center justify-start h-full min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Account for navbar height with padding-top */}
        <div className="text-white text-left pt-20 sm:pt-0">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-semibold leading-tight sm:leading-snug md:leading-snug drop-shadow-2xl">
            <span className="block">Where Every Step</span>
            <span className="block mt-1 sm:mt-2">Tells A Story</span>
          </h1>
        </div>
      </div>
    </section>
  );
}

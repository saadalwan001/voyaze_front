import React from "react";

export default function VideoBackgroundSection() {
  const videoId = "sprotb7pjOE";

  return (
    <section className="relative w-full h-screen overflow-hidden mb-[80px]">
      {/* Background Video */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
      <iframe
        className="absolute top-1/2 left-1/2 w-[120%] h-[120%] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&loop=1&mute=1&playlist=${videoId}&controls=0&rel=0&modestbranding=1&playsinline=1`}
        title="Background Video"
        allow="autoplay; encrypted-media; picture-in-picture"
        allowFullScreen
      ></iframe>
      </div>

      {/* Overlay for darkening */}
      <div className="absolute top-0 left-0 w-full h-full bg-opacity-40"></div>

      {/* Text Content */}
      <div className="relative z-10 flex items-center justify-start h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-white text-left">
          <h1 className="text-[30px] sm:text-4xl md:text-5xl font-semibold leading-snug drop-shadow-lg">
            Where Every Steps<br />Tells A Story
          </h1>
        </div>
      </div>
    </section>
  );
}
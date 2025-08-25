import React from "react";

 function GetInTouchSection() {
  return (
     <section className="max-w-6xl mx-auto my-12 px-6 py-8 border border-gray-100 rounded-[20px] shadow-lg bg-white">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Left Column */}
        <h2 className="text-[45px] font-semibold text-gray-800">
          Get in Touch With Voyaz Travel
        </h2>

        {/* Right Column */}
        <button
          type="button"
          className="inline-flex items-center px-5 py-3 bg-[#03567F] text-white font-semibold rounded-md hover:bg-[#024360] transition"
        >
          CLICK HERE&nbsp; &rarr;
        </button>
      </div>
    </section>
  );
  
};

export default GetInTouchSection;

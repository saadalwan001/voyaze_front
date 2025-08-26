import React from "react";

const PackageHeader = ({
  title,
  total_days,
  description,
  main_image,
  sub_image1,
  sub_image2,
  sub_image3,
  sub_image4
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Image Grid */}
      <div className="grid grid-cols-4 grid-rows-2 gap-4 mb-8">
        {/* Main image spans 2x2 */}
        <div className="col-span-2 row-span-2 overflow-hidden rounded-lg">
          <img
            src={main_image}
            alt={title}
            className="w-[800px] h-[620px] rounded object-cover transition-transform duration-[2000ms] ease-in-out hover:scale-105"
          />
        </div>

        {/* Sub images */}
        <div className="overflow-hidden rounded-lg">
          <img
            src={sub_image1}
            alt={`${title} 1`}
            className="w-[400px] h-[300px] object-cover transition-transform duration-[2000ms] ease-in-out hover:scale-105"
          />
        </div>

        <div className="overflow-hidden rounded-lg">
          <img
            src={sub_image2}
            alt={`${title} 2`}
            className="w-[400px] h-[300px] object-cover transition-transform duration-[2000ms] ease-in-out hover:scale-105"
          />
        </div>

        <div className="overflow-hidden rounded-lg">
          <img
            src={sub_image3}
            alt={`${title} 3`}
            className="w-[400px] h-[300px] object-cover transition-transform duration-[2000ms] ease-in-out hover:scale-105"
          />
        </div>

        <div className="overflow-hidden rounded-lg">
          <img
            src={sub_image4}
            alt={`${title} 4`}
            className="w-[400px] h-[300px] object-cover transition-transform duration-[2000ms] ease-in-out hover:scale-105"
          />
        </div>
      </div>

      {/* Package Info */}
      <div className="flex justify-between items-center mb-4 max-w-[850px]">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800">{title}</h1>

        {/* Days Card */}
        <div className="flex flex-col border-1 border-blue-600 rounded-lg overflow-hidden w-[80px]">
            {/* Top row: number of days */}
  <div className="bg-blue-600 text-white flex items-center justify-center p-2">
    <span className="text-2xl md:text-3xl font-bold">{total_days}</span>

  </div>
  {/* Bottom row: word "Days" */}
  <div className="bg-white text-gray-500 flex items-center justify-center p-1">
    <span className="text-sm font-medium">Days</span>
  
  </div>

        </div>
      </div>

      {/* Description */}
      <p className="text-gray-600 text-justify leading-relaxed max-w-[700px]">{description}</p>
    </div>
  );
};

export default PackageHeader;

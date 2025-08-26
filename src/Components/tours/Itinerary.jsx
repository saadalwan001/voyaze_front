import React, { useState } from "react";
import { Check, X, MapPin, ChevronDown, ChevronUp } from "lucide-react";

const Itinerary = ({ itineraries }) => {
  const [expandAll, setExpandAll] = useState(true);
  const [expandedItems, setExpandedItems] = useState(
    itineraries.map(() => true) // here initally all will be in expanded state
  );

  const toggleItem = (index) => {
    const newExpanded = [...expandedItems];
    newExpanded[index] = !newExpanded[index];
    setExpandedItems(newExpanded);
  };

  return (
    <div className="max-w-7xl ml-[120px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="mt-12 max-w-4xl  px-4 sm:px-6 lg:px-8 ">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <span className="text-4xl font-semibold text-[#313041]">Itinerary</span>
        <div className="flex items-center mb-4">
  <span className="mr-2 text-gray-600 font-medium">Expand All</span>
  
  <button
    onClick={() => setExpandAll(!expandAll)}
    className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors duration-300 ${
      expandAll ? "bg-blue-600" : "bg-gray-300"
    }`}
  >
    <span
      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
        expandAll ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </button>
</div>

      </div>

      {/* Itinerary List */}
      <div className="relative">
        {itineraries.map((item, idx) => {
          const isExpanded = expandAll ? true: expandedItems[idx];
          const isLast = idx === itineraries.length - 1;

          return (
            <div key={idx} className="relative mb-6 ">

              {/* Vertical dotted line */}
              {!isLast && (
                <span className="absolute left-6 top-8 h-full border-l-2 border-dotted border-gray-300"></span>
              )}

              <div className="flex items-start">
                {/* Icon */}
                <div className="flex flex-col items-center size-[50px]">
                  {idx === 0 || isLast ? (
                    <MapPin className="w-[50px] h-[50px] p-2 bg-blue-600 text-white rounded-full z-2" />
                  ) : (
                    <div className="w-3 h-3 border-2 border-blue-600 rounded-full mt-2"></div>
                  )}
                </div>

                <div className="ml-4 flex-1">
                  {/* Header with toggle */}
                  <div className="flex justify-between items-center cursor-pointer" onClick={() => toggleItem(idx)}>
                    <span className="font-semibold text-lg">{item.day_title}</span>
                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                  </div>

                  {/* Description */}
                  {isExpanded && (
                    <div className="mt-2 text-gray-600 text-justify">
                      <p className="whitespace-pre-line">{item.description}</p>

                      {/* Included / Excluded Items */}
                      <div className="flex justify-between mt-4">
                        <div className="flex flex-col space-y-1">
                          <span className="text-xl text-gray-950">Included</span>
                          {item.included_items?.map((inc, i) => (
                            <div key={i} className="flex items-center text-green-600">
                              <Check className="w-4 h-4 mr-1" /> {inc}
                              
                            </div>
                            
                          ))}
                        </div>
                        
                        <div className="flex flex-col space-y-1 text-red-600">
                          <span className="text-xl text-gray-950 text-right">Excluded</span>
                          {item.excluded_items?.map((exc, i) => (
                            <div key={i} className="flex items-center">
                              <X className="w-4 h-4 mr-1" /> {exc}
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Horizontal line */}
                      <hr className="mt-4 border-gray-200" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
};

export default Itinerary;

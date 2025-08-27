import React from "react";
import { Check, X } from "lucide-react";

const IncludeExcludeList = ({ included_items = [], excluded_items = [] }) => {
  if (
    (!included_items || included_items.length === 0) &&
    (!excluded_items || excluded_items.length === 0)
  ) {
    return <p className="text-gray-500">No include/exclude items available.</p>;
  }

  return (
    <div className="space-y-6">
      {/* Included Items */}
      {included_items && included_items.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-4 bg-green-50 shadow-sm max-w-4xl">
          <h3 className="text-lg font-semibold text-green-700 mb-2">Included</h3>
          <ul className="space-y-2">
            {included_items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-md"
              >
                <Check size={16} className="text-green-700" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Excluded Items */}
      {excluded_items && excluded_items.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-4 bg-red-50 shadow-sm max-w-4xl">
          <h3 className="text-lg font-semibold text-red-700 mb-2">Excluded</h3>
          <ul className="space-y-2">
            {excluded_items.map((item, idx) => (
              <li
                key={idx}
                className="flex items-center gap-2 bg-red-100 px-3 py-1 rounded-md"
              >
                <X size={16} className="text-red-700" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default IncludeExcludeList;

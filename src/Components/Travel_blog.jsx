import React from "react";
import { LucideUser, LucideMessageCircle } from "lucide-react";

const cards = [
  {
    id: 1,
    date: "30",
    month: "AUG",
    author: "VOYAZ",
    comments: 0,
    image: "/blog01.png",
    text: "Walking Through History: The Pekoe Trail's Journey Into Sri Lanka's Tea Heart",
  },
  {
    id: 2,
    date: "15",
    month: "JUL",
    author: "VOYAZ",
    comments: 0,
    image: "/blog02.png",
    text: "Sri Lanka's Green Tourism Revolution: A Traveler's Guide To Sustainable Adventures",
  },
  {
    id: 3,
    date: "05",
    month: "JUN",
    author: "ADMIN",
    comments: 0,
    image: "/blog03.jpg",
    text: "Ultimate Guide to Sri Lanka Visa For Indian Travelers in 2025",
  },
];

function TravelBlogSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h3 className="text-lg sm:text-xl text-gray-700 mb-2">
        Inspiration For Your Next Adventure
      </h3>
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
        Travel Blog
      </h1>
      <div className="w-20 h-1.5 mx-auto bg-[#313d44] mb-8 rounded"></div>
      <p className="max-w-3xl mx-auto text-gray-600 mb-10 text-sm sm:text-base">
        Explore travel tips, destination guides, and insider stories to help you
        plan the perfect trip to Sri Lanka.
      </p>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {cards.map(({ id, date, month, author, comments, image, text }) => (
          <div
            key={id}
            className="relative rounded-lg shadow-lg overflow-hidden cursor-pointer flex flex-col justify-end bg-cover bg-center transition-transform hover:scale-[1.02]"
            style={{
              backgroundImage: `url(${image})`,
              minHeight: "480px" ,
            }}
          >
            {/* Date box */}
            <div className="h-[100px] sm:h-[100px] absolute top-1/2 right-0 transform -translate-y-1/2 bg-[#03567F] text-white px-3 sm:px-4 py-[1px] font-semibold tracking-wider text-xs sm:text-sm rounded-l-md shadow-lg z-30">
              <div>{date}</div>
              <div>{month}</div>
            </div>

            {/* Bottom white content box */}
            <div className="bg-white pt-4 px-4 sm:px-6 rounded-t-3xl shadow-md text-left relative min-h-[220px] sm:min-h-[240px] flex flex-col z-30">
              {/* Author & Comments */}
              <div className="flex items-center space-x-4 sm:space-x-6 mb-4 sm:mb-6 text-[#03567F] text-xs sm:text-sm">
                <div className="flex items-center space-x-1 sm:space-x-2">
                  <LucideUser className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="font-medium">{author}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <LucideMessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span>{comments} COMMENTS</span>
                </div>
              </div>

              {/* Blog title */}
              <p className="font-extrabold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900 hover:text-[#03567F] transition-colors duration-300 cursor-pointer">
                {text}
              </p>

              {/* Read more link */}
              <a
                href="#"
                className="inline-block text-xs sm:text-sm font-semibold text-[#03567F]"
              >
                READ MORE &rarr;
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <button className="bg-[#03567F] text-white font-medium text-sm sm:text-md px-5 py-3 sm:px-6 sm:py-4 mt-10 rounded hover:bg-[#024360] transition-all">
        READ MORE &nbsp; →
      </button>
      </div>
    </section>
  );
}

export default TravelBlogSection;

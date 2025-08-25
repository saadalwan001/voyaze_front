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
    content:"Picture this: You're standing at the edge of a misty mountain range, surrounded by emerald"



  },
  {
    id: 2,
    date: "15",
    month: "JUL",
    author: "VOYAZ",
    comments: 0,
    image: "/blog02.png",
    text: "Sri Lanka's Green Tourism Revolution: A Traveler's Guide To Sustainable Adventures",
    content: "Picture this: your're sipping Ceylon tea on a misty morning in Ella, watching the sunrise",
  },
  {
    id: 3,
    date: "05",
    month: "JUN",
    author: "ADMIN",
    comments: 0,
    image: "/blog03.jpg",
    text: "Ultimate Guide to Sri Lanka Visa For Indian Travelers in 2025",
    content:"Planning a Sri Lanka trip from India in 2025? One of the steps is ",
  },
  {
    id: 4,
    date: "19",
    month: "JUN",
    author: "ADMIN",
    comments: 0,
    image: "/srilanka.jpg",
    text: "How To Plan A Budget-Friendly Sri Lanka Trip From Inida in 2025",
    content:"Dreaming of a topical escape without breaking the bank? Good news! A budget Sri Lanka trip.",
  },

  {
    id: 5,
    date: "19",
    month: "JUN",
    author: "ADMIN",
    comments: 0,
    image: "/Sigiriyapic.jpg",
    text: "Exploring Sri Lanka's Cultural Heritage: A Guide for Indian Tourists",
    content:"Sri Lanka is more than just a tropical paradise. It is a land steeped in",
  },
  {
    id: 6,
    date: "19",
    month: "JUN",
    author: "ADMIN",
    comments: 0,
    image: "/elephantimg.jpg",
    text: "10 Must-Visit Sri Lanka Destinations For Indian Travelers in 2025",
    content:"Planning a vaccation in 2025??? If you're an Indian traveler looking for a unique mix",
  },
];

function TravelBlogSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center mt-[80px]">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {cards.map(({ id, date, month, author, comments, image, text, content }) => (
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

              {/*Content*/}
              <p className="font-medium text-base sm:text-sm mb-3 sm:mb:4 text-gray-500">
                {content}
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

      
    </section>
  );
}

export default TravelBlogSection;

import React, { useEffect, useState } from "react";
import { LucideUser, LucideMessageCircle } from "lucide-react";
import { Link } from "react-router-dom"; 
import api from "@/utlis/axios.js"; 

function TravelBlogSection() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await api.get("/admin-blogs");
        setBlogs(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12 text-center mt-[80px]">
        <p>Loading blogs...</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center mt-[80px]">
      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {blogs.slice(0, 3).map((blog) => {
          const { id, admin, img_url, title, description, publisher_date } = blog;

          // Format date
          const dateObj = new Date(publisher_date);
          const date = dateObj.getDate().toString().padStart(2, "0");
          const month = dateObj.toLocaleString("default", { month: "short" }).toUpperCase();

          // Limit title & description
          const titlePreview = title.length > 80 ? title.slice(0, 77) + "..." : title;
          const descriptionPreview = description.replace(/<[^>]+>/g, "");
          const descriptionLimited = descriptionPreview.length > 150 ? descriptionPreview.slice(0, 147) + "..." : descriptionPreview;

          return (
            <Link
              to={`/blog/${id}`} 
              key={id}
              className="relative rounded-lg shadow-lg overflow-hidden flex flex-col justify-end bg-cover bg-center transition-transform hover:scale-[1.02]"
              style={{
                backgroundImage: `url(${img_url ? import.meta.env.VITE_API_URL.replace("/api", "") + img_url : "/placeholder.png"})`,
                minHeight: "480px",
              }}
            >
              {/* Date box */}
              <div className="h-[100px] sm:h-[100px] absolute top-[220px] right-0 transform -translate-y-1/2 bg-[#03567F] text-white px-3 sm:px-4 py-[1px] font-semibold tracking-wider text-xs sm:text-sm rounded-l-md shadow-lg z-30">
                <div>{date}</div>
                <div>{month}</div>
              </div>

              {/* Bottom white content box */}
              <div className="bg-white pt-4 px-4 sm:px-6 rounded-t-3xl shadow-md text-left relative min-h-[220px] sm:min-h-[240px] flex flex-col z-30 pb-5">
                {/* Author & Comments */}
                <div className="flex items-center space-x-4 sm:space-x-6 mb-4 sm:mb-6 text-[#03567F] text-xs sm:text-sm">
                  <div className="flex items-center space-x-1 sm:space-x-2">
                    <LucideUser className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span className="font-medium">{admin?.name || "ADMIN"}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <LucideMessageCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                    <span>0 COMMENTS</span>
                  </div>
                </div>

                {/* Blog title */}
                <p className="font-extrabold text-base sm:text-lg mb-3 sm:mb-4 text-gray-900 hover:text-[#03567F] transition-colors duration-300 cursor-pointer line-clamp-2">
                  {titlePreview}
                </p>

                {/* Content */}
                <p className="font-medium text-base sm:text-sm mb-3 sm:mb-4 text-gray-500 line-clamp-4">
                  {descriptionLimited}
                </p>

                {/* Read more link */}
                <span className="inline-block text-xs sm:text-sm font-semibold text-[#03567F]">
                  READ MORE &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

export default TravelBlogSection;

import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "@/utlis/axios.js";
import Blog_C from '@/Components/blog/Blog_Comment.jsx';

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [recentPosts, setRecentPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await api.get(`/admin-blogs/${id}`);
        setBlog(res.data);

        // Fetch recent posts (excluding current)
        const recentRes = await api.get("/admin-blogs?limit=5");
        setRecentPosts(recentRes.data.filter((b) => b.id !== id));
        setLoading(false);
      } catch (err) {
        console.error("Error fetching blog:", err);
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading || !blog) {
    return (
      <section className="max-w-7xl mx-auto px-4 py-12 text-center mt-[80px]">
        <p>Loading blog...</p>
      </section>
    );
  }

  const { title, description, img_url, admin, category, publisher_date } = blog;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 mt-[80px] flex flex-col lg:flex-row gap-8">
      {/* Left Main Content */}
      <div className="lg:w-2/3">
        {/* Main Image */}
        <img
          src={img_url ? import.meta.env.VITE_API_URL.replace("/api", "") + img_url : "/placeholder.png"}
          alt={title}
          className="w-full h-[400px] object-cover rounded-lg mb-4"
        />

        {/* Author, Category & Published Date */}
        <div className="flex items-center text-gray-500 text-sm mb-3 gap-4">
          <span>By: {admin?.name || "ADMIN"}</span>
          <span>Category: {category}</span>
          <span>Published: {new Date(publisher_date).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h1 className="font-extrabold text-2xl sm:text-3xl mb-4 text-gray-900">{title}</h1>

        {/* Description */}
        <div
          className="text-gray-700 leading-relaxed space-y-4 text-justify"
          dangerouslySetInnerHTML={{ __html: description }}
        />
        <hr className="border-gray-300 mb-4 mt-6" />
        <Blog_C/>
      </div>
      

      {/* Right Recent Posts Panel */}
      <div className="lg:w-1/3 flex flex-col gap-4">
        <h2 className="font-bold text-xl mb-2">Recent Posts</h2>
        <div className="flex flex-col gap-4">
          {recentPosts.map((post) => {
            const postTitle = post.title.length > 50 ? post.title.slice(0, 47) + "..." : post.title;
            return (
              <Link
                to={`/blog/${post.id}`}
                key={post.id}
                className="flex items-center gap-3 bg-white rounded-lg shadow p-2 hover:shadow-lg transition-shadow"
              >
                <img
                  src={post.img_url ? import.meta.env.VITE_API_URL.replace("/api", "") + post.img_url : "/placeholder.png"}
                  alt={post.title}
                  className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                />
                <p className="text-gray-900 font-medium text-sm line-clamp-2">{postTitle}</p>
              </Link>
            );
          })}
        </div>
      </div>

      
    </section>
  );
}

export default BlogDetails;

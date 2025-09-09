import React, { useState } from "react";
import api from "@/utlis/axios.js";

function CommentForm({blogId}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);
  const [message, setMessage]=useState("");

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
      const res=await api.post("/comments",{
        blog_id:  blogId,
        commenter_name:name,
        commenter_email:email,
        commenter_text:comment,

      });

      setMessage(res.data.message);
      setName("");
      setEmail("");
      setComment("");
      setSaveInfo(false);
    }catch (err) {
  if (err.response?.status === 422) {
    console.error("Validation failed:", err.response.data.errors); // 👈 see exact fields
    setMessage("Validation failed. Please check your input.");
  } else {
    console.error(err);
    setMessage("Failed to post Comment. Try Again.");
  }
}
  
  };

  return (
    <section className="max-w-7xl mt-12 px-4 sm:px-6 lg:px-8 mx-[-28px]">
      {/* Heading */}
      <span className="text-xl font-semibold mb-6 text-[#1A5775]">Add a Comment</span>

      {/* Horizontal Line */}
      <div className="w-20 h-0.5  bg-[#313d44] mb-10 mt-4"></div>

      {/* Info Text */}
      <p className="text-gray-500 text-sm mb-4 ">
        Your email address will not be published
      </p>

      {message && <p className="text-green-600">{message}</p>}

      {/* Form */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
        {/* Name */}
        <input
          type="text"
          placeholder="Your Name*"
          value={name}
          onChange={(e) => setName(e.target.value)}
          
          className="h-[60px] border-none rounded-lg px-4 py-2 focus:outline-none   bg-[#E0F4FF]"
          required
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email *"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-[60px] border-none rounded-lg px-4 py-2 focus:outline-none   bg-[#E0F4FF]"
          required
        />

        {/* Checkbox */}
        <label className="flex items-center space-x-2 text-gray-600">
          <input
            type="checkbox"
            checked={saveInfo}
            onChange={(e) => setSaveInfo(e.target.checked)}
            className="w-4 h-4 text-[#03567F] border-gray-300 rounded "
          />
          <span>Save my name, email, and website in this browser for the next time I comment.</span>
        </label>

        {/* Comment Area */}
        <textarea
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={6}
          className="h-[200px] border-none rounded-lg px-4 py-2 focus:outline-none   bg-[#E0F4FF]"
          required
        ></textarea>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-[#03567F] text-white font-semibold py-2 rounded-lg hover:bg-[#024a62] transition-colors w-[200px] h-[60px]"
        >
          POST COMMENT
        </button>
      </form>
    </section>
  );
}

export default CommentForm;

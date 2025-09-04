import React, { useState } from "react";

function CommentForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [saveInfo, setSaveInfo] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now just log values. Later you can integrate API
    console.log({ name, email, comment, saveInfo });
    // Reset form if needed
    setName("");
    setEmail("");
    setComment("");
    setSaveInfo(false);
  };

  return (
    <section className="max-w-7xl mt-12 px-4 sm:px-6 lg:px-8 mx-[-28px]">
      {/* Heading */}
      <span className="text-xl font-semibold mb-6">Add a Comment</span>

      {/* Horizontal Line */}
      <div className="w-20 h-0.5  bg-[#313d44] mb-10 mt-4"></div>

      {/* Info Text */}
      <p className="text-gray-500 text-sm mb-4 ">
        Your email address will not be published
      </p>

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

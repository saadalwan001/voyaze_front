import React, { useEffect, useState } from "react";
import api from "@/utlis/axios.js";

function CommentsList({ blogId }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await api.get(`/comments/${blogId}`); 
        setComments(res.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching comments:", err);
        setLoading(false);
      }
    };

    fetchComments();
  }, [blogId]);

  if (loading) {
    return <p className="text-gray-500">Loading comments...</p>;
  }

  if (comments.length === 0) {
    return <p className="text-gray-500">No comments yet. Be the first to comment!</p>;
  }

  return (
    <div className="mt-8">
      <span className="text-lg font-semibold text-[#1A5775]">{comments.length} Comment{comments.length > 1 ? "s" : ""}</span>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="border border-gray-200 p-4 rounded-lg bg-gray-50 mt-6">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-gray-800">{comment.commenter_name}</span>
              <span className="text-gray-400 text-sm">{new Date(comment.created_at).toLocaleString()}</span>
            </div>
            <p className="text-gray-700">{comment.commenter_text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CommentsList;

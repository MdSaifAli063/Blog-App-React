import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";

function PostCard({ $id, title, featuredimage }) {
  const imageUrl = featuredimage
    ? appwriteService.getFilePreview(featuredimage)
    : null;

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition duration-300 border border-blue-200">
        <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100 flex items-center justify-center">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="text-gray-400 text-sm">No image available</span>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800 text-center drop-shadow-sm">
          {title}
        </h2>
      </div>
    </Link>
  );
}

export default PostCard;

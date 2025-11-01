import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config.js";

function PostCard({ $id, title, featuredimage, featuredImage, userid, userData, onDelete }) {
  // Handle both lowercase and camelCase field names
  const imageId = featuredimage || featuredImage;
  
  // Check if current user is the author
  const isAuthor = userData && userid && userData.$id === userid;
  
  const [imageError, setImageError] = useState(false);

  // Generate image URL - same approach as Post.jsx
  const imageUrl = imageId ? appwriteService.getFilePreview(imageId) : null;

  useEffect(() => {
    if (imageId) {
      console.log(`PostCard ${$id}: Image ID:`, imageId, "URL:", imageUrl);
    } else {
      console.log(`PostCard ${$id}: No imageId. featuredimage:`, featuredimage, "featuredImage:", featuredImage);
    }
  }, [imageId, $id, featuredimage, featuredImage, imageUrl]);

  const handleImageError = () => {
    console.error(`PostCard ${$id}: Image failed to load from URL:`, imageUrl);
    setImageError(true);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete($id, imageId);
    }
  };

  return (
    <div className="relative w-full bg-white/60 backdrop-blur-md rounded-2xl p-4 shadow-lg hover:shadow-xl transition duration-300 border border-blue-200">
      {isAuthor && onDelete && (
        <button
          onClick={handleDelete}
          className="absolute top-2 right-2 z-10 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center shadow-lg transition-colors"
          title="Delete post"
          aria-label="Delete post"
        >
          ×
        </button>
      )}
      <Link to={`/post/${$id}`} className="block">
        <div className="w-full aspect-video rounded-xl overflow-hidden mb-4 bg-gradient-to-br from-indigo-100 via-blue-100 to-cyan-100 flex items-center justify-center relative">
          {imageUrl && !imageError ? (
            <img
              src={imageUrl}
              alt={title || "Post image"}
              className="w-full h-full object-cover"
              onError={handleImageError}
              onLoad={() => {
                console.log(`PostCard ${$id}: Image loaded successfully from:`, imageUrl);
              }}
            />
          ) : (
            <span className="text-gray-400 text-sm">No image available</span>
          )}
        </div>
        <h2 className="text-xl font-bold text-gray-800 text-center drop-shadow-sm">
          {title}
        </h2>
      </Link>
    </div>
  );
}

export default PostCard;

import React from 'react'
import { Link } from "react-router-dom"
import appwriteService from "../appwrite/config.js"

function PostCard({ $id, title, featuredImage }) {
  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white/60 backdrop-blur-md rounded-xl p-4 shadow-md hover:shadow-lg transition duration-300">
        <div className="w-full flex justify-center mb-4">
          <img
            src={appwriteService.getFilePreview(featuredImage)}
            alt={title}
            className="rounded-xl w-full h-48 object-cover"
          />
        </div>
        <h2 className="text-xl font-bold text-gray-800 text-center">{title}</h2>
      </div>
    </Link>
  )
}

export default PostCard
import React, { useState, useEffect } from 'react'
import appwriteService from "../appwrite/config"
import Container from '../components/container/Container'
import PostCard from "../components/PostCard"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Home() {
  const [posts, setPosts] = useState([])
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts) {
        setPosts(posts.documents)
      }
    })
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-cyan-100 to-indigo-200 py-10">
      <Container>
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-4 drop-shadow-sm">
            Welcome to MyBlog 🚀
          </h1>
          <p className="text-lg text-gray-700 max-w-xl mx-auto">
            Discover insightful posts, share your thoughts, and connect with a vibrant community.
          </p>
          <div className="mt-6 flex justify-center">
            <Link to={authStatus ? "/all-posts" : "/login"}>
              <button className="px-7 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white font-semibold hover:scale-105 transition duration-300 shadow-lg">
                See Posts
              </button>
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">📚 Read Posts</h3>
            <p className="text-gray-600">Explore a variety of topics shared by our community.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">✍️ Write Posts</h3>
            <p className="text-gray-600">Share your ideas and experiences with the world.</p>
          </div>
          <div className="bg-white/60 backdrop-blur-md p-6 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-2">💬 Engage</h3>
            <p className="text-gray-600">Comment, like, and connect with other readers.</p>
          </div>
        </div>

        {/* Posts Section */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Latest Posts</h2>
          {posts.length === 0 ? (
            <div className="text-center text-gray-600 py-10">
              <p>No posts available. {authStatus ? "Start by adding one!" : "Login to read posts."}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {posts.map((post) => (
                <PostCard key={post.$id} {...post} />
              ))}
            </div>
          )}
        </div>
      </Container>
    </div>
  )
}

export default Home
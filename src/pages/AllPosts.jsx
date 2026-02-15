import React from 'react'
import appwriteService from "../appwrite/config"
import { useState } from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Container from '../components/container/Container'
import PostCard from "../components/PostCard"


function AllPosts() {
  const [posts, setPosts] = useState([])
  const userData = useSelector((state) => state.auth.userData)

  const fetchPosts = () => {
    appwriteService.getPosts([]).then((posts) => {
      if (posts && posts.documents) {
        console.log("Fetched posts:", posts.documents.length, "posts")
        posts.documents.forEach((post) => {
          console.log(`Post ${post.$id}:`, {
            title: post.title,
            featuredimage: post.featuredimage,
            featuredImage: post.featuredImage,
            userid: post.userid,
            allFields: Object.keys(post)
          })
        })
        setPosts(posts.documents)
      }
    }).catch((error) => {
      console.error("Error fetching posts:", error)
    })
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  const handleDeletePost = async (postId, featuredimage) => {
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      const deleted = await appwriteService.deletePost(postId);
      if (deleted) {
        // Delete the associated image file if it exists
        if (featuredimage) {
          try {
            await appwriteService.deleteFile(featuredimage);
          } catch (error) {
            console.error("Error deleting image file:", error);
          }
        }
        // Refresh the posts list after successful deletion
        fetchPosts();
      } else {
        alert("Failed to delete post. Please try again.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post: " + error.message);
    }
  }

  return (
    <div className='w-full py-8'>
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {posts.map((post) => (
            <PostCard 
              key={post.$id}
              {...post}
              userData={userData}
              onDelete={handleDeletePost}
            />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default AllPosts
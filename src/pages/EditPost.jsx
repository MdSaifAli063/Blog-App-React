import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import Container from "../components/container/Container";
import PostForm from "../components/post-form/PostForm";

function EditPost() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService
        .getPost(slug)
        .then((result) => {
          if (result) {
            // ✅ Check ownership before allowing edit
            if (userData && result.userid === userData.$id) {
              setPost(result);
            } else {
              alert("You are not authorized to edit this post.");
              navigate("/");
            }
          } else {
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error loading post:", error);
          navigate("/");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [slug, navigate, userData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading post for edit...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Post not found 😢
      </div>
    );
  }

  return (
    <div className="py-10 min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-indigo-100">
      <Container>
        <div className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            ✏️ Edit Post
          </h1>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  );
}

export default EditPost;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import Button from "../components/Button";
import Container from "../components/container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  // Check if current user is the author
  const isAuthor = post && userData ? post.userid === userData.$id : false;

  useEffect(() => {
    if (slug) {
      setLoading(true);
      appwriteService.getPost(slug).then((result) => {
        if (result) {
          setPost(result);
        } else {
          navigate("/");
        }
        setLoading(false);
      });
    }
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!post) return;
    const confirmed = window.confirm("Are you sure you want to delete this post?");
    if (!confirmed) return;

    try {
      const deleted = await appwriteService.deletePost(post.$id);
      if (deleted) {
        if (post.featuredimage) {
          await appwriteService.deleteFile(post.featuredimage);
        }
        navigate("/");
      }
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600 text-lg">
        Loading post...
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
    <div className="py-8 min-h-screen bg-gradient-to-br from-blue-100 via-cyan-100 to-indigo-100">
      <Container>
        {/* Image Section */}
        <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2 bg-white/60 backdrop-blur-md shadow-md">
          {post.featuredimage ? (
            <img
              src={appwriteService.getFilePreview(post.featuredimage)}
              alt={post.title}
              className="rounded-xl max-h-[500px] object-cover"
            />
          ) : (
            <div className="text-gray-400 italic py-10">No image available</div>
          )}

          {isAuthor && (
            <div className="absolute right-6 top-6 flex space-x-3">
              <Link to={`/edit-post/${post.$id}`}>
                <Button bgColor="bg-green-500">Edit</Button>
              </Link>
              <Button bgColor="bg-red-500" onClick={deletePost}>
                Delete
              </Button>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="w-full mb-6 bg-white/70 backdrop-blur-md p-6 rounded-xl shadow-md">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{post.title}</h1>
          <div className="prose prose-lg max-w-none text-gray-700">
            {parse(post.content || "<p>No content available</p>")}
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Post;

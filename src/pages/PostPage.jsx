import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../context/userContext";
import { fetchUserPosts } from "../utils/postsAPI";
import Header from "../components/Header";
import PostModal from "../components/Posts/PostModal";
import Post from "../components/Posts/Post";

const PostPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch Posts
  useEffect(() => {
    console.log("👤 user:", user);

    if (user?.id) {
      const loadPosts = async () => {
        try {
          const data = await fetchUserPosts(user.id);
          setPosts(data);
        } catch (err) {
          console.error("❌ Error loading posts", err);
        } finally {
          setLoading(false);
        }
      };
      loadPosts();
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <Header
            title="Your Posts"
            showBackButton={true}
            onBack={() => navigate(-1)}
          />

          {/* Create Post Modal */}
          <PostModal
            onPostCreated={(newPost) => setPosts([newPost, ...posts])}
          />
        </div>

        {loading ? (
          <div className="flex flex-col gap-4 items-center py-8 w-full">
            {/* Spinner */}
            <span className="loading loading-spinner loading-lg text-lilac mb-6"></span>

            {/* Skeleton Post Placeholder */}
            <div className="w-full max-w-xl space-y-4 animate-pulse">
              <div className="h-6 bg-base rounded w-1/3"></div>
              <div className="h-4 bg-base rounded w-2/3"></div>
              <div className="h-64 bg-base rounded w-full"></div>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-8 w-full">
            <p className="text-[#181B4D]">You haven't created any posts yet.</p>
            <Post /> {/* Fake fallback post */}
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;

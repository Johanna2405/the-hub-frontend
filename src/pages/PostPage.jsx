import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { useUser } from "../context/UserContext";
import { useCommunity } from "../context/CommunityContext";
import { fetchUserPosts, fetchCommunityPosts } from "../utils/postsAPI";

import Header from "../components/Header";
import PostModal from "../components/Posts/PostModal";
import Post from "../components/Posts/Post";

const PostPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { currentCommunity } = useCommunity();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load posts depending on context
  useEffect(() => {
    const loadPosts = async () => {
      try {
        if (currentCommunity?.id) {
          const data = await fetchCommunityPosts(currentCommunity.id);
          setPosts(data);
        } else if (user?.id) {
          const data = await fetchUserPosts(user.id);
          setPosts(data);
        }
      } catch (err) {
        console.error("Error loading posts", err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [user, currentCommunity]);

  const isCommunityView = Boolean(currentCommunity?.id);

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center">
          <Header
            title={
              isCommunityView ? currentCommunity.name + " Posts" : "Your Posts"
            }
            showBackButton={true}
            onBack={() => navigate(-1)}
          />

          {/* Create Post Modal */}
          <PostModal
            communityId={isCommunityView ? currentCommunity.id : null}
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
            <p className="text-[#181B4D]">No posts yet.</p>
            <Post /> {/* Fake fallback */}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4">
            {posts.map((post) => (
              <Post key={post.id} post={post} setPosts={setPosts} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PostPage;

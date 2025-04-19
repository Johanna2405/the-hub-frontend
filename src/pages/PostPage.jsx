import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useUser } from "../context/UserContext";
import { useCommunity } from "../context/CommunityContext";
import {
  fetchUserPosts,
  fetchCommunityPosts,
  sortPostsByNewest,
} from "../utils/posts";

import Header from "../components/Header";
import PostModal from "../components/Posts/PostModal";
import Post from "../components/Posts/Post";

const PostPage = () => {
  const navigate = useNavigate();
  const { user, loading: loadingUser } = useUser();
  const { currentCommunity } = useCommunity();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const isCommunityView = Boolean(currentCommunity?.id);

  useEffect(() => {
    if (loadingUser) return;

    const loadPosts = async () => {
      try {
        if (isCommunityView) {
          const data = await fetchCommunityPosts(currentCommunity.id);
          setPosts(sortPostsByNewest(data));
        } else if (user?.id) {
          const data = await fetchUserPosts(user.id);
          setPosts(sortPostsByNewest(data));
        }
      } catch (err) {
        console.error("Error loading posts", err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [loadingUser, user, currentCommunity]);

  return (
    <div>
      <div>
        <div className="flex justify-between items-center">
          <Header
            title={
              isCommunityView ? `${currentCommunity.name} Posts` : "Your Posts"
            }
            showBackButton={true}
            onBack={() => navigate(-1)}
          />

          <PostModal
            communityId={isCommunityView ? currentCommunity.id : null}
            onPostCreated={(newPost) => setPosts([newPost, ...posts])}
          />
        </div>

        {loading ? (
          <div className="flex flex-col gap-4 items-center py-8 w-full">
            <span className="loading loading-spinner loading-lg text-lilac mb-6"></span>
            <div className="w-full max-w-xl space-y-4 animate-pulse">
              <div className="h-6 bg-base rounded w-1/3"></div>
              <div className="h-4 bg-base rounded w-2/3"></div>
              <div className="h-64 bg-base rounded w-full"></div>
            </div>
          </div>
        ) : posts.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-8 w-full">
            <p className="text-text">No posts yet.</p>
            <Post />
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-4 lg:grid lg:grid-cols-2 lg:items-stretch">
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

import { useEffect, useState } from "react";
import { useCommunity } from "../../context/CommunityContext";
import { fetchCommunityPosts, fetchUserPosts } from "../../utils/postsAPI";
import { useUser } from "../../context/UserContext";
import { useNavigate } from "react-router";
import IconBtn from "../IconBtn";

const PostCard = ({ postId, onRemove }) => {
  const [expanded, setExpanded] = useState(false);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  const { currentCommunity } = useCommunity();
  const { user } = useUser();
  const navigate = useNavigate();

  const isPrivate = !currentCommunity;

  // Load posts initially
  useEffect(() => {
    const load = async () => {
      try {
        let postList = [];

        if (currentCommunity?.id) {
          postList = await fetchCommunityPosts(currentCommunity.id);
        } else if (user?.id) {
          postList = await fetchUserPosts(user.id);
        }

        setPosts(postList);

        // Restore selected post
        if (postId) {
          const found = postList.find((p) => p.id === postId);
          if (found) setSelectedPost(found);
        } else if (isPrivate) {
          const stored = JSON.parse(localStorage.getItem("pinnedApps")) || [];
          const match = stored.find(
            (app) => app.type === "posts" && app.postId
          );
          if (match?.postId) {
            const found = postList.find((p) => p.id === match.postId);
            if (found) setSelectedPost(found);
          }
        }
      } catch (err) {
        console.error("Failed to load posts:", err);
      }
    };

    load();
  }, [currentCommunity, user]);

  const handleSelect = (post) => {
    setSelectedPost(post);
    setShowDropdown(false);

    // Save selection for private boards
    if (isPrivate) {
      const stored = JSON.parse(localStorage.getItem("pinnedApps")) || [];
      const updated = stored.map((app) =>
        app.type === "posts" ? { ...app, postId: post.id } : app
      );
      localStorage.setItem("pinnedApps", JSON.stringify(updated));
    }
  };

  return (
    <div className="relative rounded-3xl p-4 m-2 max-w-64 transition-all duration-300 min-h-[250px] bg-neon text-[#181B4D] flex flex-col justify-between">
      <div>
        <i className="fi-rr-text"></i>
        <h2 className="font-bold text-lg mb-2">Pinned Post</h2>
        <div className="absolute top-2 right-2">
          <IconBtn icon="fi fi-br-cross" transparent onClick={onRemove} />
        </div>

        {/* No post selected */}
        {!selectedPost && (
          <div className="flex flex-col gap-2">
            <p className="text-sm italic">No post selected</p>
            <div
              role="button"
              tabIndex={0}
              onClick={() => setShowDropdown((prev) => !prev)}
              onKeyDown={(e) =>
                e.key === "Enter" && setShowDropdown((prev) => !prev)
              }
              className="btn border-none flex bg-neon text-text gap-2 w-fit px-3 py-1 rounded-xl cursor-pointer"
            >
              <i className="fi fi-rr-search pt-1 text-lg text-text" />
              <span className="font-semibold">Choose Post</span>
            </div>
          </div>
        )}

        {/* Post Dropdown */}
        {showDropdown && (
          <div className="mt-2 max-h-32 overflow-y-auto rounded-lg bg-white/40 p-2">
            {posts.length === 0 && <p className="text-sm">Loading...</p>}
            {posts.map((post) => (
              <div
                key={post.id}
                className="cursor-pointer p-1 hover:underline text-sm"
                onClick={() => handleSelect(post)}
              >
                {post.title}
              </div>
            ))}
          </div>
        )}

        {/* Post preview */}
        {selectedPost && (
          <>
            <p className="font-medium">{selectedPost.title}</p>
            <p className="text-sm">
              {expanded
                ? selectedPost.content
                : `${selectedPost.content.slice(0, 80)}...`}
            </p>
            {expanded && (
              <h3
                className="mt-2 hover:underline text-sm font-medium cursor-pointer"
                onClick={() => navigate("/posts")}
              >
                View full post
              </h3>
            )}
          </>
        )}
      </div>

      {/* Expand toggle */}
      {selectedPost && (
        <div className="flex justify-end mt-4">
          <IconBtn
            icon={expanded ? "fi-rr-angle-up" : "fi-rr-angle-down"}
            color="neon"
            transparent
            onClick={() => setExpanded(!expanded)}
          />
        </div>
      )}
    </div>
  );
};

export default PostCard;

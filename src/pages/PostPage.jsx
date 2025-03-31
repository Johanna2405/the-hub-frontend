import Header from "../components/Header";
import { useNavigate } from "react-router";
import PostModal from "../components/Posts/PostModal";
import Post from "../components/Posts/Post";

const PostPage = () => {
  const navigate = useNavigate();

  return (
    <div>
      <Header
        title="Your Posts"
        showBackButton={true}
        onBack={() => navigate(-1)}
      />
      <PostModal />
      <Post />
    </div>
  );
};

export default PostPage;

import Header from "../components/Header";
import { useNavigate } from "react-router";
import PostModal from "../components/Posts/PostModal";

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
    </div>
  );
};

export default PostPage;

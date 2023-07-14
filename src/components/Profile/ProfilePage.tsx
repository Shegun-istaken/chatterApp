import AuthConsumer from "../../context/UserContext";
import { Link } from "react-router-dom";
import { useGetUserPosts } from "../../firebase_setup/firebase";
import PostPreview from "../Posts/PostPreview";

function ProfilePage() {
  const { userData } = AuthConsumer();
  const { userPosts } = useGetUserPosts();

  return (
    <div>
      {userData ? (
        <div>
          This is the Profile Page
          <h1>{`${userData.userName} ${userData.name} ${userData.status}`}</h1>
          <Link to="/createPost">
            <button>Create New Post</button>
          </Link>
        </div>
      ) : (
        <h1>Loading User Data</h1>
      )}

      <div>
        <PostPreview list={userPosts} />
      </div>
    </div>
  );
}

export default ProfilePage;

import AuthConsumer from "../../context/UserContext";
import { Link } from "react-router-dom";

function ProfilePage() {
  const { userData } = AuthConsumer();

  return (
    <div>
      {userData ? (
        <div>
          This is the Profile Page
          <h1>{`${userData.userName} ${userData.name} ${userData.status}`}</h1>
          <Link to="/createPost"><button>Create New Post</button></Link>
        </div>
      ) : (
        <h1>Loading User Data</h1>
      )}
    </div>
  );
}

export default ProfilePage;

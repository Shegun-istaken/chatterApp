import AuthConsumer from "../../context/UserContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getAuthorData, getUserPosts } from "../../firebase_setup/firebase";
import PostPreview from "../Posts/PostPreview";
import "./profile.css";
import UserAvatar from "../NavBar/UserAvatar";
import { useEffect, useState } from "react";

function ProfilePage() {
  const { userData } = AuthConsumer();
  const [userPosts, setUserPosts] = useState(null);
  const [authorData, setAuthorData] = useState(null);
  const [authorFunctions, setAuthorFunctions] = useState(null);
  const id = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getPosts() {
      const posts = await getUserPosts(id.userName);
      setUserPosts(posts);
    }

    async function getAuthor() {
      const data = await getAuthorData(id.userName);
      setAuthorData(data);
    }

    if (id.userName) {
      getPosts();
      getAuthor();
    }
  }, [id]);

  useEffect(() => {
    if (userData && authorData) {
      if (userData.status == "writer") {
        if (authorData.userName == userData.userName) {
          setAuthorFunctions(true);
        }
      }
    }
  }, [authorData, userData]);

  useEffect(() => {
    if (userData) {
      if (location.pathname == "/profile" || location.pathname == "/profile/") {
        navigate(`/profile/${userData.userName}`);
      }
    }
  }, [location, userData]);

  return (
    <div className="profilePage">
      <div>
        {authorData ? (
          <div className="profileData">
            <div className="profileDataHeading">
              <UserAvatar
                url={authorData.avatarURL}
                className="profileAvatar"
              />
              <h1> {authorData.name}</h1>
            </div>
            <div>
              <h3>
                Username: <span>{authorData.userName}</span>
              </h3>
              <h3>
                Chatter Status: <span>{authorData.status}</span>
              </h3>
              <div>
                <h3>Bio:</h3>
                {authorData.bio ? (
                  <p className="bio">{authorData.bio}</p>
                ) : (
                  <p>Nothing. Yet...</p>
                )}
              </div>
            </div>
            {authorFunctions && (
              <div>
                <Link to={"/editData"}>
                  <button className="createProfilePost common">
                    Edit Your Personal Data
                  </button>
                </Link>
                <Link to="/createPost">
                  <button className="createProfilePost common">
                    Create New Post
                  </button>
                </Link>
              </div>
            )}
          </div>
        ) : (
          <h1 className="profileLoadingData">Loading User Data</h1>
        )}
      </div>
      <div>
        <PostPreview list={userPosts} />
      </div>
    </div>
  );
}

export default ProfilePage;

import { useParams, useNavigate } from "react-router-dom";
import { getPost, getAuthorData } from "../../firebase_setup/firebase";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { deletePost } from "../../firebase_setup/firebase";
import AuthConsumer from "../../context/UserContext";
import UserAvatar from "../NavBar/userAvatar";
import "./posts.css";

function ViewPost() {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [authorFunctions, setAuthorFunctions] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = AuthConsumer();

  useEffect(() => {
    async function initGetPost() {
      const fetchedPost = await getPost(id);
      setPost(fetchedPost);
      const authorInfo = await getAuthorData(fetchedPost.author);
      setAuthor(authorInfo);
    }

    initGetPost();
  }, []);

  useEffect(() => {
    if (userData && post) {
      if (post.author == userData.userName) {
        setAuthorFunctions(true);
      }
    }
  }, [post, userData]);

  function handleEditClick() {
    navigate(`/editPost/${id}`);
  }

  function handleDeletePost() {
    deletePost(id);
    navigate("/profile");
  }

  return (
    <div className="viewPost">
      {post != null ? (
        <div className="viewPostContent">
          {authorFunctions && (
            <div className="authorFunctions">
              <button onClick={handleDeletePost}>Delete</button>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}

          <h1>{post.title}</h1>
          {author && (
            <div className="authorDetails">
              <div>
                <p>{author.name}</p>
                <p>{author.userName}</p>
              </div>
              <UserAvatar url={author.avatarURL} />
            </div>
          )}

          {post.coverURL && (
            <img className="postCover" src={post.coverURL} alt="" />
          )}
          <div className="postMarkdown">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>
        </div>
      ) : (
        <h1>Loading your post now</h1>
      )}
    </div>
  );
}

export default ViewPost;

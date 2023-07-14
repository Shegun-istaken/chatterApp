import { useParams, useNavigate } from "react-router-dom";
import { getPost } from "../../firebase_setup/firebase";
import { useEffect, useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { deletePost } from "../../firebase_setup/firebase";
import AuthConsumer from "../../context/UserContext";

function ViewPost() {
  const [post, setPost] = useState(null);
  const [authorFunctions, setAuthorFunctions] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = AuthConsumer();

  useEffect(() => {
    async function initGetPost() {
      const fetchedPost = await getPost(id);
      setPost(fetchedPost);
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
    <div>
      {post != null ? (
        <div>
          {authorFunctions && (
            <div>
              <button onClick={handleDeletePost}>Delete</button>
              <button onClick={handleEditClick}>Edit</button>
            </div>
          )}
          <h1>{post.title}</h1>
          <img src={post.coverURL} width="320px" alt="" />
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      ) : (
        <h1>Loading your post now</h1>
      )}
    </div>
  );
}

export default ViewPost;

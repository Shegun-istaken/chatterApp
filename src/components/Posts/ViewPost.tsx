import { useParams, useNavigate, Link } from "react-router-dom";
import {
  getPost,
  getAuthorData,
  deletePost,
  updatePostLikes,
  addComments,
  deleteComment,
} from "../../firebase_setup/firebase";
import { useEffect, useState, useRef } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import AuthConsumer from "../../context/UserContext";
import UserAvatar from "../NavBar/UserAvatar";
import "./posts.css";
import PostInteractions from "./PostInteractions";
import CommentsView from "./CommentsView";
import CreateComment from "./CreateComment";

function ViewPost() {
  const [post, setPost] = useState(null);
  const [author, setAuthor] = useState(null);
  const [authorFunctions, setAuthorFunctions] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const { userData } = AuthConsumer();
  const commentRef = useRef<HTMLTextAreaElement>();
  const [isLikes, setIsLikes] = useState("");

  async function initGetPost() {
    const fetchedPost = await getPost(id);
    setPost(fetchedPost);
    const authorInfo = await getAuthorData(fetchedPost.author);
    setAuthor(authorInfo);
  }
  useEffect(() => {
    initGetPost();
  }, []);

  useEffect(() => {
    if (userData && post) {
      if (post.author == userData.userName) {
        setAuthorFunctions(true);
      }
    }

    if (post?.likes) {
      if (post.likes.includes(userData.userName)) {
        setIsLikes("added");
      } else {
        setIsLikes("");
      }
    }
  }, [post, userData]);

  function handleEditClick() {
    navigate(`/editPost/${id}`);
  }

  function handleDeletePost() {
    deletePost(id);
    navigate(`/profile/${userData.userName}`);
  }

  function handleAuthorClick() {
    navigate(`/profile/${author.userName}`);
  }

  async function handleLikeClick() {
    if (userData) {
      const response = await updatePostLikes(id, userData.userName);
      setIsLikes(response);
      initGetPost();
    }
  }

  async function handleComment() {
    if (commentRef.current.value.length > 1) {
      const value = commentRef.current.value;
      await addComments(id, userData.userName, value);
      initGetPost();
    }
  }

  async function handleDeleteComment(commentId: string) {
    await deleteComment(id, commentId);
    initGetPost();
  }

  return (
    <div className="viewPost">
      {post != null ? (
        <div className="viewPostContent">
          {authorFunctions && (
            <div className="authorFunctions">
              <button className="common" onClick={handleDeletePost}>
                Delete Post
              </button>
              <button className="common" onClick={handleEditClick}>
                Edit Post
              </button>
            </div>
          )}

          <h1>{post.title}</h1>
          {author && (
            <div className="authorDetails">
              <div onClick={handleAuthorClick}>
                <p>{author.name}</p>
                <p>{author.userName}</p>
              </div>
              <UserAvatar url={author.avatarURL} />
            </div>
          )}
          {post.date && <p>{post.date.toDate().toGMTString()}</p>}

          {post.coverURL && (
            <img className="postCover" src={post.coverURL} alt="" />
          )}
          <div className="postMarkdown">
            <ReactMarkdown>{post.content}</ReactMarkdown>
          </div>

          <PostInteractions
            like={handleLikeClick}
            likesCount={post.likes.length}
            commentsCount={post.comments.length}
            className="onFullView"
            response={isLikes}
          />
          <div className="addComment">
            {userData ? (
              <CreateComment
                commentRef={commentRef}
                onComment={handleComment}
              />
            ) : (
              <p>
                <Link to="/signup">Create an Account</Link> to interact with
                Chatter Posts
              </p>
            )}
            {post.comments.map((comment) => (
              <CommentsView
                key={comment.id}
                comment={comment}
                handleCommentDelete={handleDeleteComment}
              />
            ))}
          </div>
        </div>
      ) : (
        <h1>Loading your post now</h1>
      )}
    </div>
  );
}

export default ViewPost;

import AuthConsumer from "../../context/UserContext";
import { useState, useEffect } from "react";

function CommentsView({ comment, handleCommentDelete }) {
  const { userData } = AuthConsumer();
  const [isAuthor, setIsAuthor] = useState(false);

  useEffect(() => {
    if (userData) {
      if (userData.userName == comment.user) {
        setIsAuthor(true);
      } else {
        setIsAuthor(false);
      }
    }
  }, [userData, comment]);

  return (
    <div className="eachComment">
      <div>
        <div className="user">
          <i className="material-icons">person</i>
          <p>{comment.user}</p>
        </div>
        <p className="date">{comment.date.toDate().toGMTString()}</p>
      </div>
      <p>{comment.comment}</p>
      {isAuthor && (
        <button
          className="deleteComment"
          onClick={() => {
            handleCommentDelete(comment.id);
          }}
        >
          Delete Comment
        </button>
      )}
    </div>
  );
}

export default CommentsView;

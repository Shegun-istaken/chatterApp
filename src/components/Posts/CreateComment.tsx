import { useState } from "react";

function CreateComment({
  commentRef,
  onComment,
}: {
  commentRef: React.MutableRefObject<HTMLTextAreaElement>;
  onComment: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  return (
    <>
      {isCommentOpen ? (
        <div className="createComment">
          <label htmlFor="createAComment">
            Post a Comment{" "}
            <i
              onClick={() => setIsCommentOpen(false)}
              className="material-icons"
            >
              close
            </i>
          </label>
          <textarea ref={commentRef} id="createAComment" cols={30} rows={10} />
          <button
            className="common commentButton"
            onClick={(e) => {
              setIsCommentOpen(false);
              onComment(e);
            }}
          >
            Post your Comment
          </button>
        </div>
      ) : (
        <button className="common commentButton"
          onClick={() => {
            setIsCommentOpen(true);
          }}
        >
          Add Your Comment
        </button>
      )}
    </>
  );
}

export default CreateComment;

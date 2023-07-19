function PostInteractions({
  like,
  likesCount,
  commentsCount,
  className,
  response,
}: {
  like?: React.MouseEventHandler<HTMLElement>;
  likesCount: number;
  commentsCount: number;
  className?: string,
  response?: string,
}) {
  return (
    <div className={`interactionButtons ${className}`}>
      <div>
        <i onClick={like} className={`material-icons ${response == "added" && "selected"}`}>
          favorite
        </i>
        <p>{likesCount}</p>
      </div>
      <div>
        <i className="material-icons">comment</i>
        <p>{commentsCount}</p>
      </div>
      <i className="material-icons">visibility</i>
    </div>
  );
}

export default PostInteractions;

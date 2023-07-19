import { useNavigate } from "react-router-dom";
import cover from "../../assets/placeholderCover.jpg";
import PostInteractions from "./PostInteractions";

function EachPostPreview({ item }) {
  const navigate = useNavigate();

  function handlePostClick() {
    navigate(`/post/${item.id}`);
  }

  return (
    <div className="eachPostPreview" onClick={handlePostClick}>
      {item.coverURL ? (
        <img
          className="postCover"
          src={item.coverURL}
          alt="cover image"
          onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = `${cover}`;
          }}
        />
      ) : (
        <img className="postCover" src={cover} alt="" />
      )}
      <div className="previewDetails">
        {typeof item.title == "string" && (
          <h3>
            {item.title.length > 21
              ? `${item.title.slice(0, 22)}...`
              : item.title}
          </h3>
        )}
        <div className="previewCategories">
          {item.categories.map((item) => (
            <p className="categoryPreview" key={item}>
              {item}
            </p>
          ))}
        </div>

        <div className="moreDetails">
          <div className="authorDetails">
            <p>{item.author}</p>
            <i className="material-icons md-24 profile">person</i>
          </div>
          {item.date && <p>{item.date.toDate().toDateString()}</p>}
        </div>
        <PostInteractions
          likesCount={item.likes.length}
          commentsCount={item.comments.length}
        />
      </div>
      <button className="openPost" onClick={handlePostClick}>
        Open Post
      </button>
    </div>
  );
}

export default EachPostPreview;

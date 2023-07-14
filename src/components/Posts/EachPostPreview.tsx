import { useNavigate } from "react-router-dom";

function EachPostPreview({ item }) {
  const navigate = useNavigate();

  function handlePostClick() {
    navigate(`/post/${item.id}`);
  }

  return (
    <div onClick={handlePostClick}>
      {item.coverURL && (
        <img
          src={item.coverURL}
          alt="cover image"
          width="240px"
          height="240px"
        />
      )}
      <p>{item.author}</p>
      <p>{item.title}</p>
      <pre>{item.categories}</pre>
      <button onClick={handlePostClick}>Open Post</button>
    </div>
  );
}

export default EachPostPreview;

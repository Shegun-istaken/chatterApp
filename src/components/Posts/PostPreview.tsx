import EachPostPreview from "./EachPostPreview";

function PostPreview({ list }) {
  return (
    <div>
      {list ? (
        list.length > 0 ? (
          <div>
            {list.map((item) => (
              <EachPostPreview key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <p>No Posts Available</p>
        )
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default PostPreview;

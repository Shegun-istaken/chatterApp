import EachPostPreview from "./EachPostPreview";

function PostPreview({ list }) {
  return (
    <div className="postsPreview">
      {list ? (
        list.length > 0 ? (
          <>
            {list.map((item) => (
              <EachPostPreview key={item.id} item={item} />
            ))}
          </>
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

function FeedHeader({ text }: { text: string }) {
  function capitalizeFirstLetter(value: string) {
    return `${value[0].toUpperCase()}${value.slice(1)}`;
  }

  return (
    <>
      {text == "all" ? (
        <h1>Your Feed</h1>
      ) : (
        <h1>Your Feed<span>{` - ${capitalizeFirstLetter(text)}`}</span></h1>
      )}
    </>
  );
}

export default FeedHeader;

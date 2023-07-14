import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { useState, useEffect } from "react";

function PreviewFullPost({ item, close, submit }) {
  const [imageURL, setImageURL] = useState(null);

  function convertFileToURL() {
    const file = item.coverURL;
    const reader = new FileReader();
    reader.onload = (event) => {
      setImageURL(event.target.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  useEffect(() => {
    if (item.coverURL) {
      if (typeof item.coverURL != "string") {
        convertFileToURL();
      } else {
        setImageURL(item.coverURL);
      }
    }
  }, []);

  return (
    <div>
      <h1>{item?.title}</h1>
      <img src={imageURL} alt="cover image" />
      <ReactMarkdown>{item?.content}</ReactMarkdown>
      <button onClick={close}>Return to Edit</button>
      <button onClick={submit}>Submit</button>
    </div>
  );
}

export default PreviewFullPost;

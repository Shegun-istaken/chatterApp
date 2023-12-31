import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState, useEffect } from "react";
import CategoriesList from "./CategoriesList";
import { addNewPost, getPost, updatePost } from "../../firebase_setup/firebase";
import AuthConsumer from "../../context/UserContext";
// import PreviewFullPost from "./PreviewFullPost";
import { useParams, useNavigate } from "react-router-dom";
import { DocumentData } from "firebase/firestore";

const initialData = {
  author: "",
  title: "",
  content: "",
  categories: [],
  coverURL: null,
  likes: [],
  comments: [],
  views: [],
};

type initialDataType = {
  author: string;
  title: string;
  content: string;
  categories: string[];
  coverURL: null | File | string;
  likes: string[];
  comments: string[];
  views: string[];
};

function CreatePost({ type }: { type: string }) {
  // const [openPreview, setOpenPreview] = useState(false);
  const { userData } = AuthConsumer();
  const [values, setValues] = useState<initialDataType | DocumentData | any>(
    initialData
  );
  const { id } = useParams();
  const navigate = useNavigate();

  async function initGetPost() {
    const fetchedPost = await getPost(id);
    setValues(fetchedPost);
  }

  useEffect(() => {
    if (type == "edit") {
      initGetPost();
    }
  }, []);

  function handleInputChange(
    e: React.ChangeEvent<HTMLInputElement>,
    type: string
  ) {
    switch (type) {
      case "title":
        setValues({ ...values, title: e.target.value });
        break;
      case "cover":
        setValues({ ...values, coverURL: e.target.files[0] });
        break;
    }
  }

  function handleContentChange(value: string) {
    setValues({ ...values, content: value });
  }

  function handleCategoryChange(value: string) {
    if (values.categories.includes(value)) {
      setValues({
        ...values,
        categories: values.categories.filter((item) => item != value),
      });
    } else setValues({ ...values, categories: [...values.categories, value] });
  }

  // function previewPost(type?: string) {
  //   if (type != "close") {
  //     setOpenPreview(true);
  //   } else {
  //     setOpenPreview(false);
  //   }
  // }

  function handleSubmit() {
    if (values.title && values.content) {
      const postData = {
        ...values,
        author: userData.userName,
        date: new Date(),
      };
      delete postData.coverURL;

      if (type == "new") {
        addNewPost(postData, values.coverURL);
        navigate("/feed");
      } else {
        updatePost(postData, values.coverURL, id);
        navigate("/profile");
      }
    } else {
      console.log("You have to add a title and content");
    }
  }

  function clearAll() {
    setValues(initialData);
  }

  return (
    <div className="createPost postCase">
      <h1>Create a New Post here</h1>
      <div className="titleInput">
        <label htmlFor="title">
          <h2>What's the title of your Article?</h2>
        </label>
        <input
          value={values.title}
          onChange={(e) => {
            handleInputChange(e, "title");
          }}
          id="title"
          type="text"
        />
      </div>
      <CategoriesList
        list={values.categories}
        handleChange={handleCategoryChange}
      />
      <div className="addCover">
        <label htmlFor="coverImage">
          <h2>Upload a Cover Image for your Article</h2>
        </label>
        <input
          onChange={(e) => {
            handleInputChange(e, "cover");
          }}
          type="file"
          id="coverImage"
          accept=".jpg, .jpeg, .png"
        />
      </div>

      <div>
        <h2>Write your Post Content</h2>
        <p>
          <small>Highlight text to format it</small>
        </p>
        <SimpleMdeReact value={values.content} onChange={handleContentChange} />
        {/* {openPreview && (
          <PreviewFullPost
            item={values}
            close={() => {
              previewPost("close");
            }}
            submit={handleSubmit}
          />
        )} */}
      </div>

      <div className="createPostAction">
        {/* <button
          onClick={() => {
            previewPost("open");
          }}
        >
          Preview your post
        </button> */}
        <button onClick={handleSubmit}>Publish</button>

        <button onClick={clearAll}>Clear All</button>
      </div>
    </div>
  );
}

export default CreatePost;

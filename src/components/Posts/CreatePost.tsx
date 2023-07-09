import { SimpleMdeReact } from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useState, useCallback, useRef } from "react";
import CategoriesList from "./CategoriesList";
import { addNewPost } from "../../firebase_setup/firebase";

function CreatePost() {
  const [value, setValue] = useState("");
  const [tempList, setTempList] = useState([]);
  const titleRef = useRef();

  const handleContentChange = useCallback((value: string) => {
    setValue(value);
  }, []);

  function handleCategoryChange(value: string) {
    if (tempList.includes(value)) {
      setTempList(tempList.filter((item) => item != value));
    } else setTempList([...tempList, value]);
  }

  function handleSubmit(){
    const postData = {
      title: titleRef.current.value,
      content: value,
      status: [...tempList]
    }

    addNewPost(postData)
  }

  function clearAll(){
    setTempList([])
    setValue("")
    titleRef.current.value = ""
  }

  return (
    <div>
      <h1>Create a New Post here</h1>
      <label htmlFor="title">What's the title of your Article?</label>
      <input ref={titleRef} id="title" type="text" />
      <CategoriesList list={tempList} handleChange={handleCategoryChange} />

      <button
        onClick={handleSubmit}
      >
        Submit
      </button>

      <button onClick={clearAll} >Clear All</button>
      <SimpleMdeReact value={value} onChange={handleContentChange} />
    </div>
  );
}

export default CreatePost;

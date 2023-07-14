import { useFetchPosts } from "../../firebase_setup/firebase";
import categories from "../../assets/data/categories";
import { getCategoryPosts } from "../../firebase_setup/firebase";
import { useState, useEffect } from "react";
import PostPreview from "../Posts/PostPreview";

function Feed() {
  const { posts } = useFetchPosts();
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(posts);
  }, [posts]);

  async function handleCategoryClick(value) {
    if (value == "all") {
      setList(posts);
    } else {
      const categoryPosts = await getCategoryPosts(value);
      setList(categoryPosts);
    }
  }

  return (
    <div>
      This is the Feed Page
      <div>
        <h3>Categories</h3>
        <button
          onClick={() => {
            handleCategoryClick("all");
          }}
        >
          all Posts
        </button>
        {categories.map((item) => (
          <button key={item} onClick={() => handleCategoryClick(item)}>
            {item}
          </button>
        ))}
      </div>
    <PostPreview list={list} />
    </div>
  );
}

export default Feed;

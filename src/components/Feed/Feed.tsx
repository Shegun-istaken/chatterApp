import { useFetchPosts } from "../../firebase_setup/firebase";
import categories from "../../assets/data/categories";
import { getCategoryPosts } from "../../firebase_setup/firebase";
import { useState, useEffect } from "react";
import PostPreview from "../Posts/PostPreview";
import FeedHeader from "./FeedHeading";
import CategoryBar from "./CategoryBar";
import "./feed.css";
import AuthConsumer from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function Feed() {
  const { posts } = useFetchPosts();
  const [list, setList] = useState([]);
  const [categoryName, setCategoryName] = useState<string>("");
  const [sideBarOpen, setSideBarOpen] = useState<boolean>(false);
  const [authorFunctions, setAuthorFunctions] = useState<boolean>(false);
  const { userData } = AuthConsumer();
  const navigate = useNavigate();

  useEffect(() => {
    setList(posts);
  }, [posts]);

  useEffect(() => {
    if (userData) {
      if (userData.status == "writer") {
        setAuthorFunctions(true);
      }
    }
  }, [userData]);

  async function handleCategoryClick(value: string) {
    if (value == "all") {
      setList(posts);
      setCategoryName("all");
    } else {
      const categoryPosts = await getCategoryPosts(value);
      setList(categoryPosts);
      setCategoryName(value);
    }

    setSideBarOpen(false);
  }

  window.onclick = (e) => {
    if (sideBarOpen && e.target.id != "feedSidebar") {
      setSideBarOpen(false);
    }
  };

  function handleSideBar() {
    setSideBarOpen(!sideBarOpen);
  }

  return (
    <div className="feedPage">
      <div className="feedHeader">
        <header>
          <i
            id="feedSidebar"
            className="material-icons md-32"
            onClick={handleSideBar}
          >
            menu_open
          </i>
          {categoryName ? (
            <FeedHeader text={categoryName} />
          ) : (
            <h1>Your Feed</h1>
          )}
        </header>
        {authorFunctions && (
          <button
            className="common"
            onClick={() => {
              navigate("/createPost");
            }}
          >
            {" "}
            Create Your Own Post +{" "}
          </button>
        )}
      </div>
      {sideBarOpen && (
        <div className="categoriesList">
          <div className="categoriesListHeader">
            <h3>Categories</h3>
            <i className="material-icons" onClick={handleSideBar}>
              cancel
            </i>
          </div>
          <button
            onClick={() => {
              handleCategoryClick("all");
            }}
          >
            All Posts
          </button>

          <CategoryBar
            list={categories}
            handleClick={handleCategoryClick}
            active={categoryName}
          />
        </div>
      )}
      <PostPreview list={list} />
    </div>
  );
}

export default Feed;

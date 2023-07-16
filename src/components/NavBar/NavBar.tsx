import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthConsumer from "../../context/UserContext";
import "./NavBar.css";
import DropDownNav from "./DropDownNav";
import chatter from "../../assets/CHATTER.svg";
import { useState } from "react";
import UserAvatar from "./userAvatar";

function MoveToFeed() {
  return (
    <Link to="/feed">
      <button> Feed</button>{" "}
    </Link>
  );
}

function MoveToHome() {
  return (
    <Link to="/home">
      <button>Home</button>{" "}
    </Link>
  );
}
function NavBar() {
  const { authed, userData } = AuthConsumer();
  const [openNav, setOpenNav] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  function handleNavClick() {
    setOpenNav(!openNav);
  }

  function handleDropDownClick(event) {
    const id = event.target.id;
    if (id == "dropDown") {
      setOpenNav(false);
    }
  }

  window.onclick = function (event) {
    const id = event.target.id;
    if (openNav && id != "dropDownIcon") {
      setOpenNav(false);
    }
  };

  function handleJumpProfile() {
    navigate("/profile");
  }

  return (
    <nav className="main">
      <img className="logo" src={chatter} alt="" />

      <div className="navBigFeed">
        {location.pathname == "/feed" ? (
          <MoveToHome />
        ) : location.pathname == "/personalData" ? (
          <></>
        ) : (
          <MoveToFeed />
        )}
      </div>

      {authed ? (
        <div className="userNav">
          {userData ? (
            <>
              <div className="userData" onClick={handleJumpProfile}>
                <UserAvatar  url={userData.avatarURL} className="navAvatar" size="md-48" />
                <p>{userData.userName}</p>
              </div>
              <div className="toggleNavDrop">
                <i
                  onClick={handleNavClick}
                  className="material-icons md-32"
                  id="dropDownIcon"
                >
                  menu
                </i>
                <DropDownNav
                  openNav={openNav}
                  handleClick={handleDropDownClick}
                />
              </div>
            </>
          ) : (
            <p>Getting your profile info...</p>
          )}
        </div>
      ) : (
        <div className="">
          <Link to="/signup"> Sign Up</Link>
          <Link to="/login"> Log In </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;

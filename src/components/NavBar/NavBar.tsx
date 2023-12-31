import { Link, useNavigate, useLocation } from "react-router-dom";
import AuthConsumer from "../../context/UserContext";
import "./NavBar.css";
import DropDownNav from "./DropDownNav";
import chatter from "../../assets/CHATTER.svg";
import { useState, useEffect } from "react";
import UserAvatar from "./UserAvatar";

function MoveToFeed() {
  return (
    <Link to="/feed">
      <button>Jump to Feed</button>{" "}
    </Link>
  );
}

function MoveToHome() {
  return (
    <Link to="/home">
      <button>Jump to Home</button>{" "}
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

  useEffect(() => {
    if (
      authed &&
      userData == 0 &&
      location.pathname != "/personalData" &&
      location.pathname != "/login/verifyMail" &&
      location.pathname != "/signup/verifyMail"
    ) {
      navigate("/personalData");
    }
  }, [authed, userData]);

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
      console.log("closeNav")
    }
  };

  function handleJumpProfile() {
    navigate(`/profile/${userData.userName}`);
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
                <UserAvatar
                  url={userData.avatarURL}
                  className="navAvatar"
                  size="md-48"
                />
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
                  userName={userData.userName}
                  openNav={openNav}
                  handleClick={handleDropDownClick}
                />
              </div>
            </>
          ) : (userData == 0 && location.pathname == "/personalData") ||
            (userData == 0 && location.pathname == "/login/verifyMail") ||
            (userData == 0 && location.pathname == "/signup/verifyMail") ? (
            <></>
          ) : (
            <p>Getting your profile info...</p>
          )}
        </div>
      ) : (
        <div className="navAuth">
          <Link to="/signup">
            <button className="common"> Sign Up</button>
          </Link>
          <Link to="/login">
            <button className="common"> Log In</button>{" "}
          </Link>
        </div>
      )}
    </nav>
  );
}

export default NavBar;

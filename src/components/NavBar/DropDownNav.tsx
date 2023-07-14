import { handleSignOut } from "../../firebase_setup/firebase";
import { Link } from "react-router-dom";

function DropDownNav({ openNav, handleClick }: { openNav: boolean, handleClick: any }) {
  return (
    <>
      {openNav && (
        <ul className="dropDownNav" id="dropDown" onClick={handleClick}>
          <li>
            <Link to="/home"><button>Home</button></Link>
          </li>
          <button className="navFeed">Feed</button>
          <li>
            <Link to="/profile" ><button>Your Profile</button></Link>
          </li>
          <li>
            <button onClick={handleSignOut}>Sign Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default DropDownNav;

import { handleSignOut } from "../../firebase_setup/firebase";
import { Link } from "react-router-dom";

function DropDownNav({
  userName,
  openNav,
  handleClick,
}: {
  userName: string;
  openNav: boolean;
  handleClick: any;
}) {
  return (
    <>
      {openNav && (
        <ul className="dropDownNav" id="dropDown" onClick={handleClick}>
          <li>
            <Link to="/home">
              <button>Home</button>
            </Link>
          </li>

          <li>
            <Link to="/feed">
              <button id="dropDown" className="navFeed">Feed</button>
            </Link>
          </li>

          <li>
            <Link to={`/profile/${userName}`}>
              <button>Your Profile</button>
            </Link>
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

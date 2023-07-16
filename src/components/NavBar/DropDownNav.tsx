import { handleSignOut } from "../../firebase_setup/firebase";
import { Link } from "react-router-dom";

function DropDownNav({
  userName,
  openNav,
  handleClick,
}: {
  userName: string,
  openNav: boolean;
  handleClick: any;
}) {
  return (
    <>
      {openNav && (
        <ul className="dropDownNav" id="dropDown" onClick={handleClick}>
          <li>
            <button>
              <Link to="/home">Home</Link>
            </button>
          </li>

          <button className="navFeed">
            <Link to="/feed">Feed</Link>
          </button>

          <li>
            <button>
              <Link to={`/profile/${userName}`}>Your Profile</Link>
            </button>
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

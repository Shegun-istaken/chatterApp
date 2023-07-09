import { Link } from "react-router-dom";
import AuthConsumer from "../../context/UserContext";
import { handleSignOut } from "../../firebase_setup/firebase";

function NavBar(){
    const {authed} = AuthConsumer()

    return(
        <nav>
            <button><Link to="/home">Home</Link></button>
            <button><Link to="/signup">Sign Up</Link></button>
            <button><Link to="/personalData">Personalization Form</Link></button>
            <Link to="/profile" ><button>Profile</button></Link>

            <h1>{authed ? 'logged in' : 'logged out'}</h1>

            <button onClick={()=>{handleSignOut()}}>Sign Out</button>
        </nav>
    )
}

export default NavBar
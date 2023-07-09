import {auth} from "../../firebase_setup/firebase"

function Restricted(){
    return(
        <div>
            <h1>This is the restricted page</h1>
            { auth.currentUser && <p>{auth.currentUser.email}</p>}
            {auth.currentUser?.emailVerified ? <p>email verified</p> : <p>Email not verified</p>}
        </div>
    )
}

export default Restricted
import { sendVerificationMail } from "../../firebase_setup/firebase";
import { auth } from "../../firebase_setup/firebase";
import { Link } from "react-router-dom";
import { useEffect } from "react";

type typeProps = {
  type: string;
};

function VerifyMail({ type }: typeProps) {
  const forSignUp = "You're almost there";
  const forLogin = "You haven't verified your mail";

useEffect(()=>{ 
  if(auth.currentUser){
    console.log("checking", auth, auth.currentUser.emailVerified)
  }

}, [auth])
  return (
    <section className="authModal verifyMail">
      <h1>
        {type == "signup" && forSignUp} {type == "login" && forLogin}
      </h1>
      <h2>
        Use the link in the mail to activate your account and continue here on
        Chatter.
      </h2>
      <button className="authRelocateLink" onClick={() => sendVerificationMail()}>
        You can't find the mail? Click here for a resend
      </button>
      <button className="authFormButton" onClick={() => window.location.reload()}>
        If you have verified your mail. Click here
      </button>
      <Link to="/signup">
        <button className="authRelocateLink">
          Return to {type == "signup" ? "Sign Up Page" : "Login Page"}
        </button>
      </Link>
    </section>
  );
}

export default VerifyMail;

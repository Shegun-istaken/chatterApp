import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendVerificationMail,
  updateProfile,
} from "../firebase_setup/firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthConsumer from "../context/UserContext";

function useVerifyMail() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { updateSignInReport, updateSignUpReport } = AuthConsumer();

  function signUp(email: string, password: string, userName: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        updateSignUpReport("success");
      })
      .then(() => {
        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: userName,
          });
        }
        sendVerificationMail();
      })
      .then(() => checkMailStatus("signup"))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error code:", errorCode);
        console.log("error message", errorMessage);
        updateSignUpReport(errorCode);
        // ..
      });
  }

  function signIn(email: string, password: string) {
 signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        updateSignInReport("success");
      })
      .then(() => checkMailStatus("login"))
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("error code:", errorCode);
        console.log("error message", errorMessage);
        updateSignInReport(errorCode);
      });
  }

  async function checkMailStatus(type: string) {
    // window.location.reload()
    switch (type) {
      case "signup":
        if (auth.currentUser) {
          if (auth.currentUser.emailVerified) {
            navigate("/restricted");
          } else {
            navigate(`/signup/verifyMail`);
          }
        }
        break;

      case "login":
        if (auth.currentUser) {
          if (auth.currentUser.emailVerified) {
            console.log("verified");
            navigate("/restricted");
          } else {
            navigate(`/login/verifyMail`);
            console.log("notVerified", auth.currentUser);
          }
        }
        break;
    }
  }

  return { checkMailStatus, signUp, signIn };
}

export default useVerifyMail;

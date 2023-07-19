import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendVerificationMail,
  // updateProfile,
  useUsers,
} from "../firebase_setup/firebase";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import AuthConsumer from "../context/UserContext";

function useVerifyMail() {
  const navigate = useNavigate();
  const auth = getAuth();
  const { updateSignInReport, updateSignUpReport } = AuthConsumer();
  const { getUser } = useUsers();

  function signUp(email: string, password: string,) {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
        console.log(user);
        updateSignUpReport("success");
      })
      .then(() => {
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

  async function checkUserData() {
    const data = await getUser();

    if (data) {
      navigate("/feed");
    } else {
      navigate("/personalData");
    }
  }

  async function checkMailStatus(type: string) {
    // window.location.reload()
    switch (type) {
      case "signup":
        if (auth.currentUser) {
          if (auth.currentUser.emailVerified) {
            checkUserData();
          } else {
            navigate(`/signup/verifyMail`);
          }
        }
        break;

      case "login":
        if (auth.currentUser) {
          if (auth.currentUser.emailVerified) {
            checkUserData();
          } else {
            navigate(`/login/verifyMail`);
          }
        }
        break;
    }
  }

  return { checkMailStatus, signUp, signIn, checkUserData };
}

export default useVerifyMail;

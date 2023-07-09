// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import AuthConsumer from "../context/UserContext";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendEmailVerification,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  getDocs,
  getDoc,
} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQBf-YSPwTurY0YNepsnQkzlMf5Fdj634",
  authDomain: "chatter-app-f16c1.firebaseapp.com",
  projectId: "chatter-app-f16c1",
  storageBucket: "chatter-app-f16c1.appspot.com",
  messagingSenderId: "384767474260",
  appId: "1:384767474260:web:6e4d77fae64013ecf2cbc1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore(app);

function sendVerificationMail() {
  if (auth.currentUser) {
    sendEmailVerification(auth.currentUser).then(() => {
      console.log("Email Verification Sent");
    });
  }
}

function handleSignOut() {
  signOut(auth)
    .then(() => {
      console.log("Sign Out Successful");
    })
    .catch((error) => {
      console.log("An error happened.", error);
    });
}

function useGoogle() {
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();
  function signUpWithGoogle() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        navigate("/restricted");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
        // ...
      });
  }

  return { signUpWithGoogle };
}

function passwordReset(email: string) {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      console.log("Reset Mail sent");
      // Password reset email sent!
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, errorMessage);
      // ..
    });
}

function updateUserDisplayName(userName: string) {
  updateProfile(auth.currentUser, {
    displayName: userName,
    randomPropertyName: `${userName}blablabla`,
  });
}

function useManageUsers() {
  const { createUserReport, setCreateUserReport, userData, setUserData } =
    AuthConsumer();

  async function checkUsers(id: string) {
    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc) => {
      if (doc.userName) {
        console.log(doc.userName, id);
      } else {
        console.log(doc);
      }
      // if (doc.userName == id) {
      //   throw new Error("this user already exists");
      // }
    });
  }

  async function setNewUser(userName, data) {
    const id = auth.currentUser.uid;

    try {
      await checkUsers(userName);
      await setDoc(doc(db, "Users", id), { ...data });
      setUserData({ ...userData, userName: data.userName, userID: id });
      setCreateUserReport("success");
    } catch (error) {
      setCreateUserReport(error.message);
    }
  }

  return { setNewUser };
}

function useUsers() {
  async function getUser() {
    const id = auth.currentUser.uid;

    try {
      const docRef = doc(db, "Users", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return { getUser };
}

async function addNewPost(values) {
  try {
    await addDoc(collection(db, "Posts"), values);
    console.log("success");
  } catch (error) {
    console.log(error);
  }
}

export {
  app,
  auth,
  handleSignOut,
  useGoogle,
  onAuthStateChanged,
  addNewPost,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  sendVerificationMail,
  passwordReset,
  useManageUsers,
  useUsers,
};

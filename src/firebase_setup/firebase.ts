// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import useVerifyMail from "../hooks/useVerifyMail";
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
  query,
  where,
  updateDoc,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
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
const storage = getStorage();

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
  const googleProvider = new GoogleAuthProvider();
  const { checkUserData } = useVerifyMail();
  function signUpWithGoogle() {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        // const credential = GoogleAuthProvider.credentialFromResult(result);
        // const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        checkUserData();
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

// function updateUserDisplayName(userName: string) {
//   updateProfile(auth.currentUser, {
//     displayName: userName,
//     randomPropertyName: `${userName}blablabla`,
//   });
// }

function useManageUsers() {
  const { setCreateUserReport, setUserData } = AuthConsumer();
  const navigate = useNavigate();
  const {getUser} = useUsers()

  async function refreshUser(){
    const data = await getUser()
    setUserData(data)
  }


  async function checkUsers(userName) {
    const id = auth.currentUser.uid;

    const querySnapshot = await getDocs(collection(db, "Users"));
    querySnapshot.forEach((doc: DocumentData) => {
      const data = doc.data();
      if (data.userName == userName) {
        console.log("firstStep");
        if (data.userID != id) {
          console.log("secondStep");
          throw new Error("Username already in use");
        }
      }
    });
  }

  async function setNewUser(userName, data, photo) {
    const id = auth.currentUser.uid;

    try {
      await checkUsers(userName);
      await uploadCoverPhoto(id, photo, "avatars");
      const url = await getCoverURL(id, "avatars");
      await setDoc(doc(db, "Users", id), {
        ...data,
        avatarURL: url,
        userID: id,
      });
      refreshUser()
      setCreateUserReport("success");
      navigate("/feed");
    } catch (error) {
      setCreateUserReport(error.message);
      console.log("updateUserData", error);
      return error.message;
    }
  }

  async function updateUserData(values, file) {
    const id = auth.currentUser.uid;

    try {
      if (file && typeof file != "string") {
        await uploadCoverPhoto(id, file, "avatars");
        const url = await getCoverURL(id, "avatars");
        await updateDoc(doc(db, "Users", id), { ...values, avatarURL: url });
        console.log("done updating");
        refreshUser()
        navigate('/feed')
      } else {
        await updateDoc(doc(db, "Users", id), { ...values });
        console.log("done updating...");
        refreshUser()
        navigate('/feed')
      }
    } catch (error) {
      console.log("updateUserData", error);
    }
  }

  return { setNewUser, updateUserData };
}

function useUsers() {
  async function getUser() {
    const id = auth.currentUser.uid;

    try {
      const docRef = doc(db, "Users", id);
      const docSnap = await getDoc(docRef);
      const data = docSnap.data();
      if(!data){
        return(0)
      }
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  return { getUser };
}

async function addNewPost(values, file) {
  try {
    const response = await addDoc(collection(db, "Posts"), values);

    await uploadCoverPhoto(response.id, file, "images");

    const url = await getCoverURL(response.id, "images");

    updateDoc(doc(db, "Posts", response.id), { coverURL: url });
  } catch (error) {
    console.log(error);
  }
}

async function updatePost(values, file, id) {
  try {
    if (file && typeof file != "string") {
      await uploadCoverPhoto(id, file, "images");
      const url = await getCoverURL(id, "images");
      updateDoc(doc(db, "Posts", id), { ...values, coverURL: url });
    } else if (typeof file == "string") {
      updateDoc(doc(db, "Posts", id), { ...values });
    }
  } catch (error) {
    console.log("updatePost", error);
  }
}

async function updatePostLikes(id: string, userName: string) {
  const data = await getPost(id);
  const likes = data.likes;

  if (likes.includes(userName)) {
    const indexToRemove = likes.indexOf(userName);
    likes.splice(indexToRemove, 1);
    try {
      updateDoc(doc(db, "Posts", id), {
        likes: [...likes],
      });
      return "removed";
    } catch (error) {
      console.log("deleteLike", error);
      return;
    }
  }
  // }

  try {
    const response = await updateDoc(doc(db, "Posts", id), {
      likes: [...likes, userName],
    });
    console.log("done", response, id);
    return "added";
  } catch (error) {
    console.log("updatePostLikes", error);
  }
}

async function addComments(id: string, userName: string, comment: string) {
  try {
    const data = await getPost(id);
    updateDoc(doc(db, "Posts", id), {
      comments: [
        ...data.comments,
        {
          id: new Date().getTime(),
          user: userName,
          comment: comment,
          date: new Date(),
        },
      ],
    });
    console.log("comment added");
  } catch (error) {
    console.log("addComment", error);
  }
}

async function deleteComment(postID, commentId) {
  try {
    const data = await getPost(postID);
    const updatedComments = await data.comments.filter(
      (comment) => comment.id != commentId
    );
    updateDoc(doc(db, "Posts", postID), {
      comments: [...updatedComments],
    });
  } catch (error) {
    console.log("deleteComment", error);
  }
}

function useFetchPosts() {
  const [posts, setPosts] = useState(null);

  useEffect(() => {
    async function getPostsPreview() {
      const querySnapshot = await getDocs(collection(db, "Posts"));
      const docIdSet = new Set();

      const fetchedPosts = querySnapshot.docs
        .filter((doc) => {
          // Check if the document ID already exists in the Set
          if (docIdSet.has(doc.id)) {
            return false; // Skip this document
          }
          docIdSet.add(doc.id); // Add the document ID to the Set
          return true;
        })
        .map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            author: data.author,
            title: data.title,
            categories: data.categories,
            coverURL: data.coverURL,
            date: data.date,
            likes: data.likes,
            comments: data.comments,
          };
        });

      setPosts(fetchedPosts);
    }

    getPostsPreview();
  }, []);

  return { posts };
}

// function useGetUserPosts() {
//   const [userPosts, setUserPosts] = useState(null);

//   useEffect(() => {
async function getUserPosts(userName: string) {
  const q = query(collection(db, "Posts"), where("author", "==", userName));

  const querySnapshot = await getDocs(q);
  const docIdSet = new Set();

  const fetchedPosts = querySnapshot.docs
    .filter((doc) => {
      // Check if the document ID already exists in the Set
      if (docIdSet.has(doc.id)) {
        return false; // Skip this document
      }
      docIdSet.add(doc.id); // Add the document ID to the Set
      return true;
    })
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        author: data.author,
        title: data.title,
        categories: data.categories,
        coverURL: data.coverURL,
        date: data.date,
        likes: data.likes,
        comments: data.comments,
      };
    });

  return fetchedPosts;
}

//   getUserPosts();
// }, []);

//   return { userPosts };
// }

async function getAuthorData(username) {
  const q = query(collection(db, "Users"), where("userName", "==", username));

  const querySnapshot = await getDocs(q);
  // const docIdSet = new Set();

  const doc = await querySnapshot.docs[0];
  const data = await doc.data();

  return data;
}

async function getCategoryPosts(type) {
  const q = query(
    collection(db, "Posts"),
    where("categories", "array-contains", type)
  );

  const querySnapshot = await getDocs(q);
  const docIdSet = new Set();

  const fetchedPosts = querySnapshot.docs
    .filter((doc) => {
      if (docIdSet.has(doc.id)) {
        return false;
      }
      docIdSet.add(doc.id);
      return true;
    })
    .map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        author: data.author,
        title: data.title,
        categories: data.categories,
        coverURL: data.coverURL,
        date: data.date,
        likes: data.likes,
        comments: data.comments,
      };
    });

  return fetchedPosts;
}

async function getPost(id) {
  try {
    const docRef = doc(db, "Posts", id);
    const docSnap = await getDoc(docRef);
    const data = docSnap.data();
    return data;
  } catch (error) {
    console.log("getPostError", error.message);
  }
}

async function deletePost(id: string) {
  try {
    await deleteDoc(doc(db, "Posts", id));
    console.log("deleted");
  } catch (error) {
    console.log("deletePost", error);
  }
}

// STORAGE *******************

async function uploadCoverPhoto(id, photo, type) {
  const imageRef = ref(storage, `${type}/${id}`);

  try {
    const snapshot = await uploadBytes(imageRef, photo);
    console.log("uploaded File", snapshot);
  } catch (error) {
    console.log("uploadPhoto", error);
  }
}

async function getCoverURL(id: string, type: string) {
  const imageRef = ref(storage, `${type}/${id}`);

  try {
    const url = await getDownloadURL(imageRef);
    console.log(url);
    return url;
  } catch (error) {
    console.log("getCover", error);
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
  useFetchPosts,
  getUserPosts,
  getCategoryPosts,
  getPost,
  updatePost,
  updatePostLikes,
  deletePost,
  getAuthorData,
  addComments,
  deleteComment,
};

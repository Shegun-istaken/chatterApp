import { createContext, useState, useContext, PropsWithChildren } from "react";
import {
  auth,
  onAuthStateChanged,
  useUsers,
} from "../firebase_setup/firebase.ts";

const authContext = createContext(null);

function useAuth() {
  const [authed, setAuthed] = useState(undefined);
  const [emailStatus, setEmailStatus] = useState(null);
  const [signInReport, setSignInReport] = useState("");
  const [signUpReport, setSignUpReport] = useState("");
  const [createUserReport, setCreateUserReport] = useState("");
  const [userData, setUserData] = useState(null);

  function logInAuth() {
    setAuthed(true);
  }

  function logOutAuth() {
    setAuthed(false);
  }

  function emailTrueStatus() {
    setEmailStatus(true);
  }

  function emailFalseStatus() {
    setEmailStatus(false);
  }

  function updateSignInReport(report: string) {
    setSignInReport(report);
  }

  function updateSignUpReport(report: string) {
    setSignUpReport(report);
  }

  return {
    authed,
    logInAuth,
    logOutAuth,
    emailStatus,
    signInReport,
    signUpReport,
    createUserReport,
    userData,
    emailTrueStatus,
    emailFalseStatus,
    updateSignInReport,
    updateSignUpReport,
    setCreateUserReport,
    setUserData,
  };
}

export function AuthProvider({ children }: PropsWithChildren) {
  const authValues = useAuth();
  const {getUser} = useUsers()

  async function refreshUser() {
    const data = await getUser();
    authValues.setUserData(data);
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      authValues.logInAuth();
      if (!authValues.userData) {
        refreshUser();
      }
    } else {
      authValues.logOutAuth();
    }
  });

  onAuthStateChanged(auth, (user) => {
    if (user?.emailVerified) {
      authValues.emailTrueStatus();
    } else {
      authValues.emailFalseStatus();
    }
  });

  return (
    <authContext.Provider value={authValues}>{children}</authContext.Provider>
  );
}

export default function AuthConsumer() {
  return useContext(authContext);
}

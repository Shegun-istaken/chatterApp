import AuthConsumer from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { PropsWithChildren } from "react";
import { useEffect } from "react";

export default function RequireAuth({ children }: PropsWithChildren) {
  const { authed } = AuthConsumer();

  return typeof authed == "boolean" ? (
    authed ? (
      children
    ) : (
      <Navigate to="/signup" />
    )
  ) : (
    <h1>Loading...</h1>
  );
}

function RequireEmailVerification({ children }: PropsWithChildren) {
  const { emailStatus } = AuthConsumer();
  useEffect(()=>{console.log(emailStatus)}, [emailStatus])

  return emailStatus ? <Navigate to="/personalData" /> : children;
}

export { RequireEmailVerification };

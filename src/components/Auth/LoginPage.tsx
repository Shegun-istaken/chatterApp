import LoginForm from "./LoginForm";
import AuthDesign from "./AuthDesign";
import { Outlet } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <AuthDesign type="login">
        <div className="authPage">
          <h1>Log In to Chatter</h1>
          <LoginForm />
        </div>
      </AuthDesign>
      <Outlet />
    </div>
  );
}

export default LoginPage;

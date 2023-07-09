import SignUpForm from "./SignUpForm";
import "./authPages.css";
import AuthDesign from "./AuthDesign";
import { Outlet } from "react-router-dom";

function SignUpPage() {
  return (
    <div >
      <AuthDesign type="signup">
        <div className="authPage">
          <h1>Sign Up with Chatter</h1>
          <SignUpForm />
        </div>
      </AuthDesign>
      <Outlet />
    </div>
  );
}

export default SignUpPage;

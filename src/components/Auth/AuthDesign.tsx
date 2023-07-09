import { ReactNode } from "react";
import login from "../../assets/login.svg";
import signup from "../../assets/signup.svg";

type AuthDesignProps = {
  children: ReactNode;
  type: string;
};

function AuthDesign({ children, type }: AuthDesignProps) {
  return (
    <main className="authMain">
      <div>
        <img
          className="mainImg"
          src={type == "login" ? login : signup}
          alt="login illustration"
        />
      </div>
      <div className="formContainer">{children}</div>
    </main>
  );
}

export default AuthDesign;

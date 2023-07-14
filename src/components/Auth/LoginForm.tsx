import { useState } from "react";
import { useFormik } from "formik";
import { loginValidate as validate } from "../../hooks/validate.ts";
import { useGoogle } from "../../firebase_setup/firebase.ts";
import useVerifyMail from "../../hooks/useVerifyMail.tsx";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import AuthConsumer from "../../context/UserContext.tsx";
import DisplayErrorReport from "./DisplayErrorReport.tsx";

function LoginForm() {
  const {signUpWithGoogle} = useGoogle()
  const { signIn } = useVerifyMail();
  const navigate = useNavigate();
  const { signInReport } = AuthConsumer();
  const [verifying, setVerifying] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validate,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
      setVerifying(true);
      if (values.email && values.password) {
        signIn(values.email, values.password);
      }
    },
  });

  return (
    <section>
      <form className="authForm" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <p className="formErrors">{formik.errors.email}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
          />
          {formik.touched.password && formik.errors.password ? (
            <p className="formErrors">{formik.errors.password}</p>
          ) : null}
        </div>

        <DisplayErrorReport
          report={signInReport}
          type="login"
          start={verifying}
        />
        <button className="authFormButton" type="submit">
          Submit
        </button>
      </form>
      <div className="authProviderGroup">
        <button onClick={() => signUpWithGoogle()}>Sign In with Google</button>
        {/* <button onClick={() => alert("not yet available")}>
          Sign In With Github
        </button> */}
      </div>
      <button
        className="authRelocateLink"
        onClick={() => navigate("/login/resetPassword")}
      >
        Forgot Password
      </button>
      <Link to="/signup">
        <button className="authRelocateLink">
          Don't have an account? Sign Up here
        </button>
      </Link>
    </section>
  );
}

export default LoginForm;

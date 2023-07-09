import {useState} from 'react';
import { useFormik } from "formik";
import { signUpValidate as validate } from "../../hooks/validate.ts";
import { useGoogle } from "../../firebase_setup/firebase.ts";
import useVerifyMail from "../../hooks/useVerifyMail.tsx";
import { Link } from "react-router-dom";
import AuthConsumer from "../../context/UserContext.tsx";
import DisplayErrorReport from "./DisplayErrorReport.tsx";

function SignUpForm() {
  const { signUp } = useVerifyMail();
  const [verifying, setVerifying] = useState(false)
  const {signUpReport} = AuthConsumer()
  const {signUpWithGoogle} = useGoogle()

  const formik = useFormik({
    initialValues: {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validate,
    onSubmit: (values) => {
      setVerifying(true)
      alert(JSON.stringify(values, null, 2)); 
      signUp(values.email, values.password, values.userName);
    },
  });
  

  function onGoogleSubmit() {
    signUpWithGoogle();
  }

  function handleGithubSubmit() {
    alert("not yet available");
  }

  return (
    <section>
      <form className="authForm" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="userName">User Name</label>
          <input
            id="userName"
            name="userName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
          />
          {formik.touched.userName && formik.errors.userName ? (
            <p className="formErrors">{formik.errors.userName}</p>
          ) : null}
        </div>
        {/* 
        <div>
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            name="firstName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.firstName}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <p className="formErrors">{formik.errors.firstName}</p>
          ) : null}
        </div>

        <div>
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            name="lastName"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.lastName}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <p className="formErrors">{formik.errors.lastName}</p>
          ) : null}
        </div> */}

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

        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <p className="formErrors">{formik.errors.confirmPassword}</p>
          ) : null}
        </div>

        <DisplayErrorReport 
          report={signUpReport}
          type="signup"
          start={verifying}
        />
        <button type="submit" className="authFormButton">
          Submit
        </button>
      </form>
      <div className="authProviderGroup">
        <button onClick={onGoogleSubmit}>Sign Up with Google</button>
        <button onClick={handleGithubSubmit}>Sign Up with Github</button>
      </div>
      <Link to="/login">
        <button className="authRelocateLink">Have an account already? Log in here</button>
      </Link>
    </section>
  );
}

export default SignUpForm;

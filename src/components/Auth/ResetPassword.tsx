import { useFormik } from "formik";
import { passwordReset } from "../../firebase_setup/firebase";
import { emailValidate as validate } from "../../hooks/validate";
import { useNavigate } from "react-router-dom";

export default function ResetPassword() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validate,
    onSubmit: (values) => {
      passwordReset(values.email);
    },
  });

  return (
    <section className="authModal">
      <form className="authForm" action="submit" onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="email">Enter Your Email Address here</label>
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

        <button className="authFormButton" type="submit">
          Reset Password
        </button>
        <button className="authRelocateLink" onClick={() => navigate("/login")}>
          Return to Login Page
        </button>
      </form>
    </section>
  );
}

import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import SignUpPage from "../components/Auth/SignUpPage.tsx";
import LandingPage from "../components/Landing/LandingPage.tsx";
import LoginPage from "../components/Auth/LoginPage.tsx";
import Restricted from "../components/Auth/Restricted.tsx";
import VerifyMail from "../components/Auth/VerifyMail.tsx";
import ResetPassword from "../components/Auth/ResetPassword.tsx";
import RequireAuth, { RequireEmailVerification } from "./RequireAuth.tsx";
import PersonalizationForm from "../components/Auth/PersonalizationForm.tsx";
import ProfilePage from "../components/Profile/ProfilePage.tsx";
import CreatePost from "../components/Posts/CreatePost.tsx";
import Feed from "../components/Feed/Feed.tsx";
import ViewPost from "../components/Posts/ViewPost.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <LandingPage />,
      },
      {
        path: "/signup",
        element: <SignUpPage />,
        children: [
          {
            path: "/signup/verifyMail",
            element: (
              <RequireEmailVerification>
                <VerifyMail type="signup" />
              </RequireEmailVerification>
            ),
          },
        ],
      },
      {
        path: "/login",
        element: <LoginPage />,
        children: [
          {
            path: "/login/verifyMail",
            element: (
              <RequireEmailVerification>
                <VerifyMail type="login" />
              </RequireEmailVerification>
            ),
          },
          {
            path: "/login/resetPassword",
            element: <ResetPassword />,
          },
        ],
      },
      {
        path: "/personalData",
        element: (
          <RequireAuth>
            <PersonalizationForm />
          </RequireAuth>
        ),
      },
      {
        path: "restricted",
        element: (
          <RequireAuth>
            <Restricted />
          </RequireAuth>
        ),
      },
      {
        path: "/profile/",
        element: (
          <RequireAuth>
            <ProfilePage />
          </RequireAuth>
        ),
      },
      {
        path: "/createPost",
        element: (
          <RequireAuth>
            <CreatePost type="new" />
          </RequireAuth>
        ),
      },{
        path: "/editPost/:id",
        element: (
          <RequireAuth>
            <CreatePost type="edit"/>
          </RequireAuth>
        )
      },{
        path: "/feed",
        element: <Feed />
      },{
        path: "/post/:id",
        element: <ViewPost />,
      },
    ],
  },
]);

export default router;
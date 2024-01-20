
import SigninPage from "../pages/Signin";
import SignupPage from "../pages/Signup";
import IntroducePage from "../pages/IntroducePage";

export const publicRoutesGen = {
  intro: "/",
  any: "*",
};

const publicRoutes = [
  {
    index: true,
    element: <IntroducePage />,
    state: "intro",
  },
  {
    path: "/*",
    element: <IntroducePage />,
    state: "any",
  },
  {
    path: "/signin",
    element: <SigninPage />,
    state: "signin",
  },
  {
    path: "/signup",
    element: <SignupPage />,
    state: "signup",
  },
];

export default publicRoutes;

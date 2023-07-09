import NavBar from "./components/NavBar/NavBar";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.pathname == "/") {
      navigate("/home");
    }
  }, [location]);

  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}

export default App;

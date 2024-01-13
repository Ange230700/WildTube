import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import NavBarDesktop from "./components/NavBarDesktop";

function App() {
  const location = useLocation();

  return (
    <div
      className="app"
      style={
        location.pathname.includes("/account")
          ? {
              gap: "10px",
            }
          : {}
      }
    >
      <Toaster />
      {!location.pathname.includes("/moviePlayer/") && <NavBarDesktop />}
      <Outlet />
      {!location.pathname.includes("/moviePlayer/") && <NavBar />}
    </div>
  );
}

export default App;

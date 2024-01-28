import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import NavBar from "./components/NavBar";
import NavBarDesktop from "./components/NavBarDesktop";
import { useUser } from "./contexts/UserContext";
import { useAdminMode } from "./contexts/AdminModeContext";

function App() {
  const location = useLocation();
  const { user, fetchUser } = useUser();
  const { isAdminMode, setIsAdminMode } = useAdminMode();

  useEffect(() => {
    fetchUser();
    if (user && user.IsAdmin) {
      setIsAdminMode(isAdminMode);
    }
  }, []);

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
      {!location.pathname.includes("/moviePlayer/") && (
        <NavBarDesktop user={user} />
      )}
      <Outlet />
      {!location.pathname.includes("/moviePlayer/") && <NavBar user={user} />}
    </div>
  );
}

export default App;

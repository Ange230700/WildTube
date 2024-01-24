import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import NavBar from "./components/NavBar";
import NavBarDesktop from "./components/NavBarDesktop";
import { useUser } from "./contexts/UserContext";

function App() {
  const location = useLocation();
  const { updateUser, user } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/userByToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          updateUser(response.data[0]);
        })
        .catch((error) => {
          console.error(error);
        });
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

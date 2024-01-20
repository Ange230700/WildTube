import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, updateUser } = useUser();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/api/userByToken`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setIsAuthenticated(true);
          updateUser(res.data);
        })
        .catch((err) => {
          console.error("Authentication error:", err);
          localStorage.removeItem("token");
        });
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return { isAuthenticated, user };
}

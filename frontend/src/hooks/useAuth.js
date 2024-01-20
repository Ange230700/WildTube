import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, updateUser } = useUser();
  const navigate = useNavigate();

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
    }
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          // Token expired or unauthorized
          localStorage.removeItem("token");
          updateUser(null);
          setIsAuthenticated(false);
          navigate("/connection");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      // Eject the interceptor when the component unmounts
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return { isAuthenticated, user };
}

import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user, updateUser } = useUser();

  const updateIsAuthenticated = (value) => {
    console.warn("isAuthenticatedBefore", value); // § it should be false but it is true. Why?
    setIsAuthenticated(value);
    console.warn("isAuthenticatedAfter", isAuthenticated); // § it should be true but it is false. Why?
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const userByToken = axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/userByToken`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (userByToken) {
        updateUser(userByToken);
      }
    }
  }, []);

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (config) => {
        const token = localStorage.getItem("token");
        if (token) {
          return {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${token}`,
            },
          };
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    return () => {
      // Eject the interceptor when the component unmounts
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return { isAuthenticated, user, updateUser, updateIsAuthenticated };
}

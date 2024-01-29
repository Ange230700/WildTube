import { createContext, useContext, useState, useMemo } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";
import isTokenExpired from "../utils/utils";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const logout = (navigate) => {
    setUser(null);
    localStorage.removeItem("token");
    if (localStorage.getItem("isAdminMode")) {
      localStorage.removeItem("isAdminMode");
    }
    // Navigate to login page
    if (navigate) {
      navigate("/connection");
    }
  };

  const fetchUser = () => {
    const token = localStorage.getItem("token");

    if (token) {
      if (isTokenExpired(token)) {
        logout();
        return;
      }

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
  };

  const contexValue = useMemo(() => {
    return { user, updateUser, fetchUser, logout };
  }, [user, updateUser, fetchUser, logout]);

  return (
    <UserContext.Provider value={contexValue}>{children}</UserContext.Provider>
  );
}

export const useUser = () => {
  return useContext(UserContext);
};

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

import { createContext, useContext, useState, useMemo } from "react";
import { PropTypes } from "prop-types";
import axios from "axios";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  const fetchUser = () => {
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
  };

  const contexValue = useMemo(() => {
    return { user, updateUser, fetchUser };
  }, [user, updateUser, fetchUser]);

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

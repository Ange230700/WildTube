import { createContext, useContext, useState, useMemo } from "react";
import { PropTypes } from "prop-types";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const updateUser = (newUser) => {
    setUser(newUser);
  };
  const contexValue = useMemo(() => {
    return { user, updateUser };
  }, [user, updateUser]);

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

import { createContext, useContext, useState, useMemo } from "react";
import { PropTypes } from "prop-types";

const AdminModeContext = createContext();

export function AdminModeProvider({ children }) {
  const [isAdminMode, setIsAdminMode] = useState(false);

  localStorage.setItem("isAdminMode", isAdminMode);

  const fetchAdminMode = () => {
    const adminMode = localStorage.getItem("isAdminMode");

    return adminMode;
  };

  const contextValue = useMemo(() => {
    return { isAdminMode, setIsAdminMode, fetchAdminMode };
  }, [isAdminMode, setIsAdminMode, fetchAdminMode]);

  return (
    <AdminModeContext.Provider value={contextValue}>
      {children}
    </AdminModeContext.Provider>
  );
}

export const useAdminMode = () => {
  return useContext(AdminModeContext);
};

AdminModeProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

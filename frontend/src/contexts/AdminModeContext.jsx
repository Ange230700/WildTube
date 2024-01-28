import { useEffect, createContext, useContext, useState, useMemo } from "react";
import PropTypes from "prop-types";

const AdminModeContext = createContext();

export function AdminModeProvider({ children }) {
  const initialAdminMode = localStorage.getItem("isAdminMode") === "true";
  const [isAdminMode, setIsAdminMode] = useState(initialAdminMode);

  localStorage.setItem("isAdminMode", isAdminMode);

  // Update localStorage whenever isAdminMode changes
  useEffect(() => {
    localStorage.setItem("isAdminMode", isAdminMode);
  }, [isAdminMode]);

  const contextValue = useMemo(() => {
    return { isAdminMode, setIsAdminMode };
  }, [isAdminMode, setIsAdminMode]);

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

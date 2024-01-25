import { createContext, useContext, useState, useMemo } from "react";
import { PropTypes } from "prop-types";

const AdminModeContext = createContext();

export function AdminModeProvider({ children }) {
  const [isAdminMode, setIsAdminMode] = useState(false);

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

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";
import isTokenExpired from "../utils/utils";

function ProtectedRoute({ children }) {
  const { fetchUser, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(navigate);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || isTokenExpired(token)) {
      handleLogout();
    }

    fetchUser();
  }, []);

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

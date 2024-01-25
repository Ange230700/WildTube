import { useEffect } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function ProtectedRoute({ children }) {
  const { fetchUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      fetchUser();
    } catch (error) {
      console.error(error);
      navigate("/connection");
    }
  }, []);

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

import PropTypes from "prop-types";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

function ProtectedRoute({ children }) {
  const { user, updateUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUser = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/userByToken`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (res.status === 200) {
        updateUser(res.data);
      }
    } catch (err) {
      console.error(err);
      if (err.response.data === "expired session") {
        localStorage.removeItem("token");
        navigate("/connection");
      }
    }
  };

  useEffect(() => {
    if (!user) {
      const token = localStorage.getItem("token");

      if (token) {
        fetchUser();
      } else {
        navigate("/connection");
      }
    }
  }, [location.pathname]);

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProtectedRoute;

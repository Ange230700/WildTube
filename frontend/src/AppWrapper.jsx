import { useNavigate } from "react-router-dom";
import axios from "axios";
import App from "./App";
import isTokenExpired from "./utils/utils";

function AppWrapper() {
  const navigate = useNavigate();

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response &&
        error.response.status === 401 &&
        isTokenExpired(localStorage.getItem("token"))
      ) {
        // Handle token expiration
        localStorage.removeItem("token");
        localStorage.removeItem("isAdminMode");
        navigate("/connection"); // Redirect to login page
      }
      return Promise.reject(error);
    }
  );

  return <App />;
}

export default AppWrapper;

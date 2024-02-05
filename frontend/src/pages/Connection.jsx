import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import LogoContainer from "../components/LogoContainer";
import { useUser } from "../contexts/UserContext";

function Connection() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { updateUser } = useUser();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const navigate = useNavigate();
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/login`,
        user
      );

      if (result.status === 200) {
        updateUser(result.data.userWithoutPassword);
        localStorage.setItem("token", result.data.token);

        if (result.data.userWithoutPassword.IsAdmin) {
          localStorage.setItem("isAdminMode", false);
        }
        navigate("/");
      }
    } catch (err) {
      toast.error("Incorrect email or password");
      console.error("Incorrect email or password");
    }
  };

  return (
    <div className="loginPage">
      <LogoContainer />
      <form
        className="form"
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <div className="inputs">
          <div className="inputContainer">
            <input
              type="text"
              className="input"
              name="email"
              value={user.email}
              placeholder="Mail address :"
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <input
              type="password"
              name="password"
              value={user.password}
              className="input"
              placeholder="Password :"
              onChange={handleInputChange}
            />
          </div>
          <div className="buttonContainer">
            <div className="connectionButton">
              <button type="submit" className="connexion">
                Log in
              </button>
            </div>
          </div>
        </div>
        <div className="signUpText">
          <p className="tuNAsPasDeCompte">
            You don't have an account ?<span> </span>
            <span>
              <NavLink to="/Inscription" className="inscrisToiIci">
                Sign up here
              </NavLink>
            </span>
            <span> </span>
            <span className="catalogue">to get access to all the movies.</span>
          </p>
        </div>
      </form>
    </div>
  );
}

export default Connection;

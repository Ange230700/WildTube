/*eslint-disable */
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
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
      const result = await axios.post("http://localhost:3310/api/login", user);
      if (result.status === 200) {
        updateUser(result.data);
        navigate("/");
      }
    } catch (err) {
      console.error("Error connecting");
    }
  };

  return (
    <div className="loginPage">
      <div className="logoContainer">
        <img className="logo2" src="src/assets/icons/logo.svg" alt="Logo" />
      </div>
      <div className="form">
        <div className="inputs">
          <div className="inputContainer">
            <input
              type="text"
              className="input"
              name="email"
              value={user.email}
              placeholder="Adresse Mail :"
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer">
            <input
              type="password"
              name="password"
              value={user.password}
              className="input"
              placeholder="Mot de passe :"
              onChange={handleInputChange}
            />
          </div>
          <div className="buttonContainer">
            <div className="connectionButton">
              <button type="button" className="connexion" onClick={handleLogin}>
                connexion
              </button>
            </div>
          </div>
        </div>
        <div className="signUpText">
          <div className="tuNAsPasDeCompte">Tu n’as pas de compte ?</div>
          <div className="signupInviteContainer">
            <NavLink to="/Inscription">
              <p className="inscrisToiIci">Inscris toi ici </p>
            </NavLink>

            <p className="catalogue">
              pour débloquer l’entièreté du catalogue.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Connection;

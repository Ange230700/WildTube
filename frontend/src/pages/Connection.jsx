import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "../contexts/UserContext";
import LogOut from "../components/LogOut";
import LogoContainer from "../components/LogoContainer";

function Connection() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { updateUser, user: connectedUser } = useUser();

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
        updateUser(result.data);
        navigate("/");
      }
    } catch (err) {
      toast.error("Email ou mot de passe incorect");
      console.error("Incorrect email or password");
    }
  };
  // const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return (
    <div className="loginPage">
      {connectedUser ? (
        <LogOut />
      ) : (
        <>
          <LogoContainer />
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              handleLogin();
            }}
          >
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
                  <button
                    type="submit"
                    className="connexion"
                    onClick={handleLogin}
                  >
                    connexion
                  </button>
                </div>
              </div>
            </div>
            <div className="signUpText">
              <p className="tuNAsPasDeCompte">
                Tu n’as pas de compte ?<span> </span>
                <span>
                  <NavLink to="/Inscription" className="inscrisToiIci">
                    Inscris toi ici
                  </NavLink>
                </span>
                <span> </span>
                <span className="catalogue">
                  pour débloquer l’entièreté du catalogue.
                </span>
              </p>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default Connection;

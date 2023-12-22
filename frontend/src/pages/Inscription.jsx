import React, { useState } from "react";
import axios from "axios";
import LogoContainer from "../components/LogoContainer";

function Inscription() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    // confirmPassword: "",
    civility: "",
    naissance: "",
  });
  const [error, setError] = useState(false);
  const [succes, setSucces] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (user.civility === "Monsieur") {
      user.civility = true;
    } else if (user.civility === "Madame") {
      user.civility = false;
    }

    try {
      const result = await axios.post("http://localhost:3310/api/users", user);
      // console.log(user);
      if (result.status === 201) {
        setSucces(true);
      } else {
        setError(true);
      }

      // console.log("Request URL:", url);
      // console.log("User registered successfully");
    } catch (someError) {
      setError(true);
      console.error("Error during registration:", someError);
    }
  };
  return (
    <div className="signUpPageMockupGuest">
      {error && <h1 style={{ color: "red", fontSize: 12 }}>Error</h1>}
      {succes && <h1 style={{ color: "green", fontSize: 12 }}>Sicces</h1>}
      <div className="searchDisplaySection">
        <LogoContainer />
        <div className="form">
          <div className="inputs">
            <div className="inputContainer">
              <input
                type="text"
                value={user.name}
                placeholder="Nom"
                name="name"
                className="input"
                onChange={handleInputChange}
              />
            </div>
            <div className="inputContainer">
              <input
                type="text"
                value={user.email}
                name="email"
                onChange={handleInputChange}
                placeholder="Adresse Mail"
                className="input"
              />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                value={user.password}
                name="password"
                onChange={handleInputChange}
                className="input"
                placeholder="Mot de passe"
              />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                className="input"
                placeholder="Confirmation du mot de passe"
              />
            </div>
          </div>

          <div className="additionalInformation">
            <div className="orientation">Civilité :</div>
            <div className="orientationContainer">
              <div className="orientationOption">
                <label className="orientationText">
                  Madame
                  <input
                    name="civility"
                    type="radio"
                    value="Madame"
                    className="radioButton"
                    onChange={handleInputChange}
                    checked={user.civility === "Madame"}
                  />
                </label>
              </div>
              <div className="orientationOption">
                <label className="orientationText">
                  Monsieur
                  <input
                    name="civility"
                    type="radio"
                    className="radioButton"
                    onChange={handleInputChange}
                    value="Monsieur"
                    checked={user.civility === "Monsieur"}
                  />
                </label>
              </div>
            </div>
            <section className="birthday">Date de naissance :</section>
            <div className="orientationContainer">
              <input
                className="inputDate"
                type="date"
                name="naissance"
                value={user.naissance}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="buttonContainer">
            <button
              className="signUpButton"
              onClick={handleSubmit}
              type="button"
            >
              <div className="inscription">Inscription</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Inscription;

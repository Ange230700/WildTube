import React, { useState } from "react";
/* eslint-disable */
import axios from "axios";

const Inscription = () => {
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
      console.log(user);
      if (result.status === 201) {
        setSucces(true);
      } else {
        setError(true);
      }

      // console.log("Request URL:", url);
      console.log("User registered successfully");
    } catch (error) {
      setError(true);
      console.error("Error during registration:", error);
    }
  };
  return (
    <div className="signUpPageMockupGuest">
      {error && <h1 style={{ color: "red", fontSize: 12 }}>Error</h1>}
      {succes && <h1 style={{ color: "green", fontSize: 12 }}>Sicces</h1>}
      <div className="searchDisplaySection">
        <div className="logoContainer">
          <img className="logo2" src="src/assets/icons/logo.svg" alt="Logo" />
        </div>
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
              ></input>
            </div>
            <div className="inputContainer">
              <input
                type="text"
                value={user.email}
                name="email"
                onChange={handleInputChange}
                placeholder="Adresse Mail"
                className="input"
              ></input>
            </div>
            <div className="inputContainer">
              <input
                type="password"
                value={user.password}
                name="password"
                onChange={handleInputChange}
                className="input"
                placeholder="Mot de passe"
              ></input>
            </div>
            <div className="inputContainer">
              <input
                type="password"
                className="input"
                placeholder="Confirmation du mot de passe"
              ></input>
            </div>
          </div>

          <div className="additionalInformation">
            <div className="orientation">Civilité :</div>
            <div className="orientationContainer">
              <div className="orientationOption">
                <label className="orientationText">Madame</label>
                <input
                  name="civility"
                  type="radio"
                  value="Madame"
                  className="radioButton"
                  onChange={handleInputChange}
                  checked={user.civility === "Madame"}
                />
              </div>
              <div className="orientationOption">
                <label className="orientationText">Monsieur</label>
                <input
                  name="civility"
                  type="radio"
                  className="radioButton"
                  onChange={handleInputChange}
                  value="Monsieur"
                  checked={user.civility === "Monsieur"}
                />
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
            <div className="signUpButton" onClick={handleSubmit}>
              <div className="inscription">Inscription</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inscription;

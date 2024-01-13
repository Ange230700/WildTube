import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoContainer from "../components/LogoContainer";
import ModalInscription from "../components/ModalInscription";

function Inscription() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    naissance: "",
    civility: "",
    password: "",
    avatar: "",
  });

  // const { updateUser, user: connectedUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let civilityValue = value;

    if (name === "civility") {
      civilityValue = value === "Monsieur";
    }

    setUser((prevData) => ({
      ...prevData,
      [name]: civilityValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        user
      );

      if (result.status === 201) {
        toggleModal();
        setTimeout(() => {
          navigate("/Connection");
        }, 3000);
      }
    } catch (someError) {
      console.error("Error during registration:", someError);
    }
  };

  return (
    <div className="signUpPageMockupGuest">
      <div className="searchDisplaySection">
        <LogoContainer />
        <form className="form" onSubmit={handleSubmit}>
          <div className="inputs">
            <div className="inputContainer">
              <input
                type="text"
                name="name"
                className="input"
                value={user.name}
                onChange={handleInputChange}
                placeholder="Nom"
              />
            </div>
            <div className="inputContainer">
              <input
                type="email"
                name="email"
                className="input"
                value={user.email}
                onChange={handleInputChange}
                placeholder="Adresse Mail"
              />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                name="password"
                className="input"
                value={user.password}
                onChange={handleInputChange}
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
                    checked={user.civility === false}
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
                    checked={user.civility === true}
                  />
                </label>
              </div>
            </div>
            <div className="birthday">Date de naissance :</div>
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
            <button className="signUpButton" type="submit">
              <p className="inscription">Inscription</p>
            </button>
          </div>
          {showModal && <ModalInscription />}
        </form>
      </div>
    </div>
  );
}

export default Inscription;

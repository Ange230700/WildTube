import { useState } from "react";
import axios from "axios";
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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");

  // const { updateUser, user: connectedUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  // const navigate = useNavigate();
  // supprimer commentaire ;
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleEmailChange = (e) => {
    setEmailError("");
    handleInputChange(e);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleSubmit = async () => {
    if (user.civility === "Monsieur") {
      user.civility = true;
    } else if (user.civility === "Madame") {
      user.civility = false;
    }
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        user
      );
      // console.log(user);
      if (result.status === 201) {
        toggleModal(); // Afficher la modale en cas de succès
        // updateUser(result.data);
        // navigate("/");
      }

      // console.log("Request URL:", url);
      // console.log("User registered successfully");
    } catch (someError) {
      if (someError.response && someError.response.status === 400) {
        // Si l'email existe déjà, définir l'erreur d'email
        setEmailError(someError.response.data.message);
      } else {
        console.error("Error during registration:", someError);
      }
    }
  };
  return (
    <div className="signUpPageMockupGuest">
      <div className="searchDisplaySection">
        <LogoContainer />
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
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
                className={`input ${
                  user.email && !emailRegex.test(user.email) ? "errorEmail" : ""
                }`}
                value={user.email}
                onChange={handleEmailChange}
                placeholder="Adresse Mail"
              />
              {emailError && <div className="errorMessage">{emailError}</div>}
            </div>
            <div className="inputContainer">
              <input
                type="password"
                name="password"
                className={`input ${
                  user.password && user.password.length < 8
                    ? "errorPassword"
                    : ""
                }`}
                minLength="8"
                value={user.password}
                onChange={handleInputChange}
                placeholder="Mot de passe"
              />
              {user.password && user.password.length < 8 && (
                <div className="errorMessage">Min 8 caractères</div>
              )}
            </div>
            <div className="inputContainer">
              <input
                type="password"
                className={`input ${
                  confirmPassword && user.password !== confirmPassword
                    ? "errorPassword"
                    : ""
                }`}
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                placeholder="Confirmation du mot de passe"
              />
              {confirmPassword && user.password !== confirmPassword && (
                <div className="errorMessage">
                  Les mots de passe ne sont pas identiques
                </div>
              )}
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
            <div className="birthday">Date de naissance :</div>
            <div className="orientationContainer">
              <input
                className="inputDate"
                type="date"
                max={new Date().toISOString().split("T")[0]}
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
              type="submit"
              disabled={
                !user.name ||
                !user.email ||
                !user.password ||
                !user.naissance ||
                !user.civility ||
                user.password.length < 8 ||
                user.password !== confirmPassword
              }
            >
              <p className="inscription">Inscription</p>
            </button>
          </div>
          {showModal && (
            <ModalInscription
              showModal={showModal}
              setShowModal={setShowModal}
            />
          )}
        </form>
      </div>
    </div>
  );
}

export default Inscription;

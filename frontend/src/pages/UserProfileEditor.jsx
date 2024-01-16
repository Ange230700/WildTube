import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import LogoContainer from "../components/LogoContainer";
import ModalInscription from "../components/ModalInscription";

function UserProfileEditor() {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    naissance: "",
    civility: "",
    password: "",
    avatar: "",
  });

  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      naissance: user.naissance
        ? new Date(user.naissance).toISOString().split("T")[0]
        : "",
      civility: user.civility || false,
      password: user.password || "",
      avatar: user.avatar || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();

    Object.keys(formData).forEach((key) => {
      if (formData[key] !== user[key]) {
        updateData.append(key, formData[key]);
      }
    });

    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`,
        updateData
      );

      if (result.status === 200) {
        updateUser(result.data);
        toggleModal();
      }
    } catch (error) {
      // Handle error...
      console.error(error);
    }
  };

  return !user ? null : (
    <div className="signUpPageMockupGuest">
      <div className="searchDisplaySection">
        <LogoContainer />
        <form className="form">
          <div className="inputs">
            <div className="inputContainer">
              <input
                type="text"
                name="name"
                className="input"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nom"
              />
            </div>
            <div className="inputContainer">
              <input
                type="email"
                name="email"
                className="input"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
              />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                className="input"
                placeholder="Ancien mot de passe"
              />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                name="password"
                className="input"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Nouveau mot de passe"
              />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                className="input"
                placeholder="Confirmation du nouveau mot de passe"
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
                    checked={formData.civility === "Madame"}
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
                    checked={formData.civility === "Monsieur"}
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
                value={formData.naissance}
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
              <p className="inscription">Modifier</p>
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

export default UserProfileEditor;

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
  // const avatars = [
  //   "avatar1.svg",
  //   "FemaleAvatar2.svg",
  //   "FemaleAvatar.svg",
  //   "MaleAvatar2.svg",
  // ];

  const [showModal, setShowModal] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  // const [selectedAvatar, setSelectedAvatar] = useState(user.avatar); // Avatar principal

  // Update these handlers to capture the new and old password inputs
  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleOldPasswordChange = (e) => {
    setOldPassword(e.target.value);
  };

  // const handleAvatarChange = async (newAvatar) => {
  //   try {
  //     // Mettez à jour l'avatar principal avec celui sélectionné
  //     setSelectedAvatar(newAvatar);

  //     // Envoyez la mise à jour au backend
  //     const response = await fetch(
  //       `${import.meta.env.VITE_BACKEND_URL}/api/update-avatar/${user.id}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           avatar: newAvatar,
  //           // Ajoutez d'autres informations de compte si nécessaire (par exemple, un identifiant utilisateur)
  //         }),
  //       }
  //     );

  //     if (!response.ok) {
  //       // Gérez les erreurs si nécessaire
  //       console.error("Failed to update avatar on the server");
  //     } else {
  //       updateUser({ ...user, avatar: newAvatar });
  //     }
  //   } catch (error) {
  //     console.error("Error updating avatar:", error.message);
  //     // Gérez les erreurs ici, par exemple, affichez un message à l'utilisateur
  //   }
  // };

  useEffect(() => {
    setFormData({
      name: user.name || "",
      email: user.email || "",
      naissance: user.naissance
        ? new Date(user.naissance).toISOString().split("T")[0]
        : "",
      civility: user.civility || "",
      password: user.password || "",
      avatar: user.avatar || "",
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData instance
    const updateData = new FormData();

    // Append modified fields to FormData
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== user[key]) {
        updateData.append(key, formData[key]);
      }
    });

    if (!updateData.password) delete updateData.password;

    if (newPassword) {
      updateData.append("newPassword", newPassword);
      updateData.append("oldPassword", oldPassword);
    }

    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`,
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (result.status === 200) {
        updateUser(result.data);
        setShowModal(true);
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
                value={oldPassword}
                onChange={handleOldPasswordChange}
                placeholder="Ancien mot de passe"
              />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                name="password"
                className="input"
                value={newPassword}
                onChange={handleNewPasswordChange}
                placeholder="Nouveau mot de passe"
              />
            </div>
            {/* <div className="inputContainer">
              <input
                type="password"
                className="input"
                placeholder="Confirmation du nouveau mot de passe"
              />
            </div> */}
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
          {/* <h3>Choisissez un nouvel avatar :</h3> */}

          {/* Afficher les options d'avatar */}
          {/* {avatars.map((avatar) => (
            <div className="choiceAvatar">
              <button
                key={avatar}
                type="button"
                onClick={() => handleAvatarChange(avatar)}
              >
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/avatars/${avatar}`}
                  alt={`Avatar ${avatar}`}
                />
              </button>
            </div>
          ))} */}
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

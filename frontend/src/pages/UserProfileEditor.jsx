import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import LogoContainer from "../components/LogoContainer";
import ModalInscription from "../components/ModalInscription";
import formatDate from "../utils/formatDate"; // Import a utility function for date formatting

function UserProfileEditor() {
  const { userId } = useParams();
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    naissance: user.naissance || "",
    civility: user.civility !== undefined ? user.civility : "",
    password: user.password || "",
    avatar: user.avatar || "",
  });

  // console.warn(formData.password, "formData");

  const [showModal, setShowModal] = useState(false);
  // const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [avatars, setAvatars] = useState([]);

  const navigate = useNavigate();

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  // eslint-disable-next-line no-unused-vars
  const [selectedAvatar, setSelectedAvatar] = useState(
    user.avatar || "https://avatars.githubusercontent.com/u/97165289"
  ); // Avatar principal

  // Update these handlers to capture the new and old password inputs
  // const handleNewPasswordChange = (e) => {
  //   setNewPassword(e.target.value);
  // };

  // const handleCurrentPassword = (e) => {
  //   setCurrentPassword(e.target.value);
  // };

  // const handleConfirmPasswordChange = (e) => {
  //   setConfirmPassword(e.target.value);
  // };

  const handleAvatarChange = async (newAvatar) => {
    try {
      // Ensure newAvatar is not null
      if (!newAvatar) {
        console.error("Invalid avatar selected");
        return;
      }

      // Mettez à jour l'avatar principal avec celui sélectionné
      setSelectedAvatar(newAvatar);

      // Envoyez la mise à jour au backend
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}/avatar`,
        { avatar: newAvatar },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        // Gérez les erreurs si nécessaire
        console.error("Failed to update avatar on the server");
      } else {
        updateUser({ ...user, avatar: newAvatar });
      }
    } catch (error) {
      console.error("Error updating avatar:", error.message);
      // Gérez les erreurs ici, par exemple, affichez un message à l'utilisateur
    }
  };

  const handleInputChange = (e) => {
    let { value } = e.target;
    const { name } = e.target;

    if (name === "civility") {
      value = value === "Monsieur";
    }

    if (name === "naissance") {
      value = formatDate(value);
    }

    if (name === "password") {
      setNewPassword(e.target.value);
    }

    setFormData({ ...formData, [name]: value });
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

    // console.warn("formData", formData.password);

    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${userId}`,
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.warn("updatedUser : ", result.data);

      if (result.status === 200) {
        const updatedUser = result.data;
        updateUser(updatedUser);
        toggleModal();
        setTimeout(() => {
          navigate("/profil");
        }, 3000);
      }
    } catch (error) {
      // Handle error...
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/avatars`
        );

        if (response.status === 200) {
          setAvatars(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAvatars();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        naissance: formatDate(user.naissance),
        civility: user.civility !== undefined ? user.civility : "",
        password: user.password,
        avatar: user.avatar,
      });
    }
  }, [user]);

  return !user ? null : (
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
            {/* <div className="inputContainer">
              <input
                type="password"
                className="input"
                value={currentPassword}
                onChange={handleInputChange}
                placeholder="Ancien mot de passe"
              />
            </div> */}
            <div className="inputContainer">
              <input
                type="password"
                name="password"
                className="input"
                value={newPassword}
                onChange={handleInputChange}
                placeholder="Nouveau mot de passe"
              />
            </div>
            {/* <div className="inputContainer">
              <input
                type="password"
                className="input"
                value={confirmPassword}
                onChange={handleInputChange}
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
                    checked={formData.civility === false || !user.civility}
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
                    checked={formData.civility === true || user.civility}
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
          <h3>Choisissez un nouvel avatar :</h3>
          {avatars.map((avatar) => (
            <div className="choiceAvatar" key={avatar.id}>
              <button type="button" onClick={() => handleAvatarChange(avatar)}>
                <img src={avatar.url} alt="Avatar" />
              </button>
            </div>
          ))}
          <div className="buttonContainer">
            <button className="signUpButton" type="submit">
              <p className="inscription">Modifier</p>
            </button>
          </div>
          {showModal && <ModalInscription />}
        </form>
      </div>
    </div>
  );
}

export default UserProfileEditor;

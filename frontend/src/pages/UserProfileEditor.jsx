import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import ModalInscription from "../components/ModalInscription";
import formatDate from "../utils/formatDate"; // Import a utility function for date formatting
import { useUser } from "../contexts/UserContext";

function UserProfileEditor() {
  const { userId } = useParams();
  const { user, fetchUser } = useUser();
  const [currentPassword, setCurrentPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [avatars, setAvatars] = useState([]);
  const navigate = useNavigate();
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    naissance: user?.naissance || "",
    civility: user?.civility || "",
    avatarId: user?.avatarId || "",
  });

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleAvatarChange = (avatar) => {
    try {
      if (!avatar) {
        setSelectedAvatar((prevData) => ({
          ...prevData,
          avatar_url: "https://avatars.githubusercontent.com/u/97165289",
        }));
        return;
      }

      setSelectedAvatar(avatar);
      setFormData((prevData) => ({
        ...prevData,
        avatarId: avatar.id,
      }));
    } catch (someError) {
      console.error("Error during avatar selection:", someError);
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

    if (name === "current_password") {
      setCurrentPassword(e.target.value);
    }

    if (name === "new_password") {
      setNewPassword(e.target.value);
    }

    if (name === "confirm_new_password") {
      setConfirmNewPassword(e.target.value);
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create a new FormData instance
    const updateData = new FormData();

    // Append modified fields to FormData
    Object.keys(formData).forEach((key) => {
      if (
        formData[key] &&
        formData[key] !== user[key] &&
        key !== "confirm_new_password"
      ) {
        updateData.append(key, formData[key]);
      }
    });

    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/${userId}`,
        { ...formData },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (result.status === 200) {
        fetchUser();
        toggleModal();
        setTimeout(() => {
          if (user?.IsAdmin) {
            navigate("/Parametre");
          } else {
            navigate("/profil");
          }
        }, 2000);
      }
    } catch (error) {
      toast.error("Current password is incorrect");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchAvatars = async () => {
      try {
        const result = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/avatars`
        );

        if (result.status === 200) {
          setAvatars(result.data);

          setFormData((prevData) => ({
            ...prevData,
            avatar: result.data[0],
          }));
        }
      } catch (someError) {
        console.error("Error during avatar fetching:", someError);
      }
    };

    fetchAvatars();
  }, []);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user?.name,
        email: user?.email,
        naissance: formatDate(user?.naissance),
        civility: user?.civility,
        avatarId: user?.avatarId,
      });

      setSelectedAvatar(
        (user?.avatar_filename &&
          `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
            user?.avatar_filename
          }`) ||
          user?.avatar_url ||
          "https://avatars.githubusercontent.com/u/97165289"
      );
    } else {
      navigate("/connection");
    }
  }, [user]);

  return (
    user && (
      <div className="signUpPageMockupGuest">
        <div className="searchDisplaySection">
          <form className="form" onSubmit={handleSubmit}>
            <div className="signUpWrapper">
              <h3>Profil Editor</h3>
              <div className="inputs">
                <div className="inputContainer">
                  <input
                    type="text"
                    name="name"
                    className="input"
                    value={formData?.name || ""}
                    onChange={handleInputChange}
                    placeholder="Nom"
                  />
                </div>
                <div className="inputContainer">
                  <input
                    type="email"
                    name="email"
                    className={`input ${
                      (formData?.email || user.email) &&
                      !emailRegex.test(user.email)
                        ? "errorEmail"
                        : ""
                    }`}
                    value={formData?.email}
                    onChange={handleInputChange}
                    placeholder="Email"
                  />
                </div>
                <div className="inputContainer">
                  <input
                    type="password"
                    name="current_password"
                    className="input"
                    value={currentPassword}
                    onChange={handleInputChange}
                    placeholder="Mot de passe actuel"
                  />
                </div>
                <div className="inputContainer">
                  <input
                    type="password"
                    name="new_password"
                    className={`input ${
                      newPassword && newPassword.length < 8
                        ? "errorPassword"
                        : ""
                    }`}
                    minLength="8"
                    value={newPassword}
                    onChange={handleInputChange}
                    placeholder="New Password"
                  />
                  {newPassword && newPassword.length < 8 && (
                    <p className="errorMessage">Min 8 caractères</p>
                  )}
                </div>
                <div className="inputContainer">
                  <input
                    type="password"
                    name="confirm_new_password"
                    className={`input ${
                      confirmNewPassword && confirmNewPassword !== newPassword
                        ? "errorPassword"
                        : ""
                    }`}
                    value={confirmNewPassword}
                    onChange={handleInputChange}
                    placeholder="Confirmation du nouveau mot de passe"
                  />
                </div>
              </div>

              <div className="additionalInformation">
                <h4 className="orientation">Civilité :</h4>
                <div className="orientationContainer">
                  <div className="orientationOption">
                    <label className="orientationText">
                      Madam
                      <input
                        name="civility"
                        type="radio"
                        value="Madame"
                        className="radioButton"
                        onChange={handleInputChange}
                        checked={
                          formData?.civility === false || !user?.civility
                        }
                      />
                    </label>
                  </div>
                  <div className="orientationOption">
                    <label className="orientationText">
                      Sir
                      <input
                        name="civility"
                        type="radio"
                        className="radioButton"
                        onChange={handleInputChange}
                        value="Monsieur"
                        checked={formData?.civility === true || user?.civility}
                      />
                    </label>
                  </div>
                </div>
                <h4 className="birthday">Date of birth :</h4>
                <div className="orientationContainer">
                  <input
                    className="inputDate"
                    type="date"
                    name="naissance"
                    value={formData?.naissance}
                    onChange={handleInputChange}
                  />
                </div>
                <h4>Choose a new avatar :</h4>
                <div className="preview">
                  {selectedAvatar && (
                    <img
                      className="avatarPreview"
                      src={
                        (selectedAvatar.avatar_filename &&
                          `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                            selectedAvatar?.avatar_filename
                          }`) ||
                        (user.avatar_filename &&
                          `
                          ${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                            user?.avatar_filename
                          }`) ||
                        selectedAvatar?.avatar_url ||
                        user?.avatar_url ||
                        "https://avatars.githubusercontent.com/u/97165289"
                      }
                      alt="Avatar"
                    />
                  )}
                </div>
                <div className="avatar-choice">
                  {avatars.map((avatar) => (
                    <button
                      key={avatar?.id}
                      className="avatarButton"
                      type="button"
                      onClick={() => handleAvatarChange(avatar)}
                    >
                      <img
                        src={
                          (avatar.avatar_filename &&
                            `${
                              import.meta.env.VITE_BACKEND_URL
                            }/assets/images/${avatar?.avatar_filename}`) ||
                          avatar?.avatar_url ||
                          "https://avatars.githubusercontent.com/u/97165289"
                        }
                        alt="Avatar"
                        className="avatar"
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="buttonContainer">
                <button className="signUpButton" type="submit">
                  <p className="inscription">To modify</p>
                </button>
              </div>
              {showModal && (
                <ModalInscription
                  toggleModal={toggleModal}
                  showModal={setShowModal}
                />
              )}
            </div>
          </form>
        </div>
      </div>
    )
  );
}

export default UserProfileEditor;

import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ModalInscription from "../components/ModalInscription";
import LogoContainer from "../components/LogoContainer";
import formatDate from "../utils/formatDate"; // Import a utility function for date formatting
import { useUser } from "../contexts/UserContext";

function UserProfileEditor() {
  const { userId } = useParams();
  const { user, fetchUser } = useUser();
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    naissance: user?.naissance || "",
    civility: user?.civility || "",
    password: user?.password || "",
    avatarId: user?.avatarId || "",
  });
  // const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [avatars, setAvatars] = useState([]);

  const navigate = useNavigate();

  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

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
      if (formData[key] && formData[key] !== user[key]) {
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
      // Handle error...
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
        password: user?.password,
        avatarId: user?.avatarId,
      });

      setSelectedAvatar(
        user?.avatar_filename ||
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
          <LogoContainer />
          <form className="form" onSubmit={handleSubmit}>
            <div className="signUpWrapper">
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
                    className="input"
                    value={formData?.email}
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
                <h4 className="orientation">Civilité :</h4>
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
                        checked={
                          formData?.civility === false || !user?.civility
                        }
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
                        checked={formData?.civility === true || user?.civility}
                      />
                    </label>
                  </div>
                </div>
                <h4 className="birthday">Date de naissance :</h4>
                <div className="orientationContainer">
                  <input
                    className="inputDate"
                    type="date"
                    name="naissance"
                    value={formData?.naissance}
                    onChange={handleInputChange}
                  />
                </div>
                <h4>Choisissez un nouvel avatar :</h4>
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
                  <button
                    className="avatarButton"
                    type="button"
                    onClick={() => handleAvatarChange(null)}
                  >
                    <img
                      className="avatar"
                      src="https://avatars.githubusercontent.com/u/97165289"
                      alt="Avatar"
                    />
                  </button>
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
                  <p className="inscription">Modifier</p>
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

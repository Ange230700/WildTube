import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoContainer from "../components/LogoContainer";
import ModalInscription from "../components/ModalInscription";
import { useUser } from "../contexts/UserContext";

function Inscription() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    naissance: "",
    civility: "",
    password: "",
    avatarId: "",
  });

  const { updateUser } = useUser();
  const [showModal, setShowModal] = useState(false);
  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

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
      setUser((prevData) => ({
        ...prevData,
        avatarId: avatar.id,
      }));
    } catch (someError) {
      console.error("Error during avatar selection:", someError);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !user.name ||
      !user.email ||
      !user.password ||
      !user.avatarId ||
      !user.naissance
    ) {
      console.error("All fields are required");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (result.status === 201) {
        const authentication = await result.data;

        updateUser(authentication);
        localStorage.setItem("token", authentication.token);

        toggleModal();
        setTimeout(() => {
          navigate("/Connection");
        }, 3000);
      } else {
        console.error("Error during registration", "result", result);
      }
    } catch (someError) {
      console.error("Error during registration:", someError);
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

          setSelectedAvatar(result.data[0]);

          setUser((prevData) => ({
            ...prevData,
            avatarId: result.data[0].id,
          }));
        }
      } catch (someError) {
        console.error("Error during avatar fetching:", someError);
      }
    };

    fetchAvatars();
  }, []);

  return (
    <main className="signUpPageMockupGuest">
      <section className="searchDisplaySection">
        <LogoContainer />
        <form className="form" onSubmit={handleSubmit}>
          <div className="signUpWrapper">
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
              <h4 className="birthday">Date de naissance :</h4>
              <div className="orientationContainer">
                <input
                  className="inputDate"
                  type="date"
                  name="naissance"
                  value={user.naissance}
                  onChange={handleInputChange}
                />
              </div>
              <h4>Choisissez un avatar :</h4>
              <div className="preview">
                {selectedAvatar && (
                  <img
                    className="avatarPreview"
                    src={
                      selectedAvatar.avatar_filename ||
                      selectedAvatar.avatar_url ||
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
                    key={avatar.id}
                    className="avatarButton"
                    type="button"
                    onClick={() => handleAvatarChange(avatar)}
                  >
                    <img
                      className="avatar"
                      src={avatar.avatar_filename || avatar.avatar_url}
                      alt="Avatar"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="buttonContainer">
              <button className="signUpButton" type="submit">
                <p className="inscription">Inscription</p>
              </button>
            </div>
          </div>
          {showModal && <ModalInscription />}
        </form>
      </section>
    </main>
  );
}

export default Inscription;

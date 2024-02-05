import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LogoContainer from "../components/LogoContainer";
import { useUser } from "../contexts/UserContext";
import ModalInscription from "../components/ModalInscription";

function Inscription() {
  const { fetchUser } = useUser();
  const [user, setUser] = useState({
    name: "",
    email: "",
    naissance: "",
    civility: "",
    password: "",
    avatarId: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
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
  const handleEmailChange = (e) => {
    setEmailError("");
    handleInputChange(e);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
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
      !user?.name ||
      !user?.email ||
      !user?.password ||
      !user?.avatarId ||
      !user?.naissance
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
        const authentication = result.data;

        updateUser(authentication.newUser);
        localStorage.setItem("token", authentication.token);

        fetchUser();
        toggleModal();
        setTimeout(() => {
          navigate("/");
        }, 3000);
      } else {
        console.error("Error during registration", "result", result);
      }
    } catch (someError) {
      if (someError.response && someError.response.status === 400) {
        // Si l'email existe déjà, définir l'erreur d'email
        setEmailError(someError.response.data.message);
      } else {
        console.error("Error during registration:", someError);
      }
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
        <form
          className="form"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <div className="signUpWrapper">
            <div className="inputs">
              <div className="inputContainer">
                <input
                  type="text"
                  name="name"
                  className="input"
                  value={user.name}
                  onChange={handleInputChange}
                  placeholder="Name"
                />
              </div>
              <div className="inputContainer">
                <input
                  type="email"
                  name="email"
                  className={`input ${
                    user.email && !emailRegex.test(user.email)
                      ? "errorEmail"
                      : ""
                  }`}
                  value={user.email}
                  onChange={handleEmailChange}
                  placeholder="Mail address"
                />
                {emailError && <p className="errorMessage">{emailError}</p>}
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
                  placeholder="Password"
                />
                {user.password && user.password.length < 8 && (
                  <p className="errorMessage">8 characters at least</p>
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
                  placeholder="Password Confirmation"
                />
              </div>
            </div>
            <div className="additionalInformation">
              <h4 className="orientation">Gender :</h4>
              <div className="orientationContainer">
                <div className="orientationOption">
                  <label className="orientationText">
                    Female
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
                    Male
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
              <h4 className="birthday">Date of birth :</h4>
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
              <h4>Choose an avatar :</h4>
              <div className="preview">
                {selectedAvatar && (
                  <img
                    className="avatarPreview"
                    src={
                      (selectedAvatar.avatar_filename &&
                        `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                          selectedAvatar?.avatar_filename
                        }`) ||
                      (selectedAvatar.avatar_url &&
                        selectedAvatar?.avatar_url) ||
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
                      src={
                        (avatar.avatar_filename &&
                          `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                            avatar?.avatar_filename
                          }`) ||
                        (avatar.avatar_url && avatar?.avatar_url)
                      }
                      alt="Avatar"
                    />
                  </button>
                ))}
              </div>
            </div>
            <div className="buttonContainer">
              <button
                className="signUpButton"
                type="submit"
                disabled={
                  !user?.name ||
                  !user?.email ||
                  !user?.password ||
                  !user?.naissance ||
                  // !user?.civility ||
                  user?.password.length < 8 ||
                  user?.password !== confirmPassword
                }
              >
                <p className="inscription">Sign up</p>
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
      </section>
    </main>
  );
}

export default Inscription;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import LogoContainer from "../components/LogoContainer";

function UserProfileEditor() {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    naissance: user.naissance,
    civility: user.civility,
    password: user.password,
    avatar: user.avatar,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      name: user.name,
      email: user.email,
      naissance: user.naissance,
      civility: user.civility,
      password: user.password,
      avatar: user.avatar,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updateData = new FormData();

    updateData.append("id", user.id);

    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        updateData.append(key, formData[key]);
      } else {
        if (typeof formData[key] === "boolean") {
          updateData.append(key, false);
        }

        if (typeof formData[key] === "number") {
          updateData.append(key, 0);
        }

        if (typeof formData[key] === "string") {
          updateData.append(key, "");
        }
      }
    });

    try {
      // Send formData to your backend
      // const response = await axios.post('/api/update-profile', updateData);
      // updateUser(response.data);
      // Handle response...

      const result = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/${user.id}`,
        updateData
      );

      if (result.status === 200) {
        updateUser(result.data);
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
        <form onSubmit={handleSubmit} className="form">
          <div className="inputs">
            <div className="inputContainer">
              <input
                type="text"
                name="name"
                className="input"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="inputContainer">
              <input
                type="email"
                name="email"
                className="input"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="inputContainer">
              <input
                type="password"
                name="password"
                className="input"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="inputContainer">
              <input
                type="date"
                name="naissance"
                className="input"
                value={
                  formData.naissance
                    ? new Date(formData.naissance).toISOString().split("T")[0]
                    : ""
                }
                onChange={handleInputChange}
              />
            </div>
            <div className="inputContainer">
              <input
                type="text"
                name="avatar"
                className="input"
                value={formData.avatar}
              />
            </div>
            <div className="buttonContainer">
              <button
                className="signUpButton"
                onClick={handleSubmit}
                type="submit"
              >
                <p className="inscription">Update Profile</p>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfileEditor;

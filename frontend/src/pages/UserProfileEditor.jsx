import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

function UserProfileEditor() {
  const { user, updateUser } = useUser();
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    naissance: user.naissance,
    avatar: user.avatar,
  });

  useEffect(() => {
    setFormData({
      ...formData,
      name: user.name,
      email: user.email,
      naissance: user.naissance,
      avatar: user.avatar,
    });
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, avatar: file });
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
        updateData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
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
    <div className="edit-profile-form">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input
          type="text"
          name="name"
          value={formData.name || ""}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          value={formData.email || ""}
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="naissance"
          value={
            formData.naissance
              ? new Date(formData.naissance).toISOString().split("T")[0]
              : ""
          }
          onChange={handleInputChange}
        />
        <input type="file" name="avatar" onChange={handleImageChange} />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
}

export default UserProfileEditor;

import React, { useState } from "react";

function AccountInfo() {
  // Supposons que vous ayez trois avatars dans le dossier des actifs
  const avatars = [
    "avatar1.svg",
    "FemaleAvatar2.svg",
    "FemaleAvatar.svg",
    "MaleAvatar.svg",
  ];

  const [selectedAvatar, setSelectedAvatar] = useState("avatar1.svg"); // Avatar principal

  const handleAvatarChange = async (newAvatar) => {
    try {
      // Mettez à jour l'avatar principal avec celui sélectionné
      setSelectedAvatar(newAvatar);

      // Envoyez la mise à jour au backend
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/update-avatar`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar: newAvatar,
            // Ajoutez d'autres informations de compte si nécessaire (par exemple, un identifiant utilisateur)
          }),
        }
      );

      if (!response.ok) {
        // Gérez les erreurs si nécessaire
        console.error("Failed to update avatar on the server");
      }
    } catch (error) {
      console.error("Error updating avatar:", error.message);
      // Gérez les erreurs ici, par exemple, affichez un message à l'utilisateur
    }
  };

  return (
    <div>
      <h2>Information de compte</h2>

      {/* Afficher l'avatar principal */}
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/avatars/${selectedAvatar}`}
        alt="Avatar principal"
      />

      <h3>Choisissez un nouvel avatar :</h3>

      {/* Afficher les options d'avatar */}
      {avatars.map((avatar) => (
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
      ))}
    </div>
  );
}

export default AccountInfo;

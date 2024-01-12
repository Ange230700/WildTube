import React, { useState } from "react";
import { useUser } from "../contexts/UserContext";

function AccountInfo() {
  // Supposons que vous ayez trois avatars dans le dossier des actifs
  const { user } = useUser();
  const { updateUser } = useUser();
  const avatars = [
    "avatar1.svg",
    "FemaleAvatar2.svg",
    "FemaleAvatar.svg",
    "MaleAvatar2.svg",
  ];

  const [selectedAvatar, setSelectedAvatar] = useState(user.avatar); // Avatar principal

  const handleAvatarChange = async (newAvatar) => {
    try {
      // Mettez à jour l'avatar principal avec celui sélectionné
      setSelectedAvatar(newAvatar);

      // Envoyez la mise à jour au backend
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/update-avatar/${user.id}`,
        {
          method: "PUT",
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
      } else {
        updateUser({ ...user, avatar: newAvatar });
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
      <div className="selectionned-avatar">
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/avatars/${selectedAvatar}`}
          alt="Avatar principal"
        />
      </div>

      <h3>Choisissez un nouvel avatar :</h3>

      {/* Afficher les options d'avatar */}
      {avatars.map((avatar) => (
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
      ))}
    </div>
  );
}

export default AccountInfo;

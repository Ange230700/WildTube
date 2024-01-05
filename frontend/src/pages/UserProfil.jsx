import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function UserProfil() {
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    updateUser(null);
    navigate("/");
  };
  return (
    <div className="ProfileDisplaySection">
      <div className="Profilepicturecontainer">
        <img
          className="Avatar1"
          src="/src/assets/icons/profile_icon.svg"
          alt="Avatar1"
        />
        <div className="User">User</div>
      </div>
      <div className="Editbuttoncontainer">
        <div className="Editbutton">
          <div className="ModifierProfil">Modifier profil</div>
        </div>
      </div>
      <div className="Useroptionscontainer">
        <div className="Useroption">
          <div className="RegarderPlusTard">À regarder plus tard</div>
        </div>
        <div className="Useroption">
          <div className="RegarderPlusTard">Favoris</div>
        </div>
        <div className="Useroption">
          <div className="RegarderPlusTard">Informations du compte</div>
        </div>
        <div className="Useroption">
          <button
            className="RegarderPlusTardButton"
            type="button"
            onClick={handleLogOut}
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserProfil;

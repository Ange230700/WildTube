import { useNavigate } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function LogOut() {
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    updateUser(null);
    navigate("/");
  };

  return (
    <div className="containerButton">
      <button type="button" className="logOut" onClick={handleLogOut}>
        Déconnexion
      </button>
    </div>
  );
}

export default LogOut;

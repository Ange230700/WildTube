import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function LogOut() {
  const { updateUser } = useUser();
  const navigate = useNavigate();

  const handleLogOut = () => {
    updateUser(null);
    navigate("/");
  };

  return (
    <div
      className="containerButton"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      <button type="button" className="logOut" onClick={handleLogOut}>
        Déconnexion
      </button>
      <Link className="logOut" to="/favorites">
        See favorites
      </Link>
    </div>
  );
}

export default LogOut;

import { useNavigate, NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function ParametreAdmin() {
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const handleLogOut = () => {
    updateUser(null);
    navigate("/");
  };
  return (
    <div className="parametreAdmin">
      <div className="profilPicture">
        <img className="Avatar1" src={updateUser.avatar} alt="Avatar1" />
      </div>
      {/* <div className="parametre">
        <h2>Paramètres</h2>
      </div> */}
      <section className="containerDisplayParametre">
        <div className="params">
          <h3>Ajouter des videos</h3>
        </div>
        <div className="params">
          <h3>Modifier les sections</h3>
        </div>
        <div className="params">
          <h3>Gérer les catégories</h3>
        </div>
        <div className="params">
          <NavLink to="/AjoutAdmin">
            <h3>Ajouter des Administrateurs</h3>
          </NavLink>
        </div>
        <div className="params">
          <button type="button" onClick={handleLogOut}>
            <h3>Déconnexion</h3>
          </button>
        </div>
      </section>
    </div>
  );
}

export default ParametreAdmin;

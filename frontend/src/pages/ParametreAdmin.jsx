import { useNavigate, Link, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function ParametreAdmin() {
  const { user } = useUser();
  const { updateUser } = useUser();
  const location = useLocation();
  const navigate = useNavigate();
  const handleLogOut = () => {
    updateUser(null);
    navigate("/");
  };
  return (
    <div
      className="ProfileDisplaySection"
      style={
        location.pathname.includes("/Parametre")
          ? {
              marginBottom: "9.375vw",
            }
          : {}
      }
    >
      <div className="Profilepicturecontainer">
        <img
          className="Avatar1"
          src={
            user.avatar
              ? user.avatar
              : "https://avatars.githubusercontent.com/u/97165289"
          }
          alt="Avatar1"
        />
        <h2 className="User">{user.name}</h2>
      </div>
      <section className="Useroptionscontainer">
        {/* <div className="Useroption">
          <NavLink className="RegarderPlusTard">
            <h3>Ajouter des videos</h3>
          </NavLink>
        </div>
        <div className="Useroption">
          <NavLink className="RegarderPlusTard" to="/EditVideo">
            <h3>Modifier / supprimer des videos</h3>
          </NavLink>
        </div> */}
        {/* <div className="Useroption">
          <NavLink className="RegarderPlusTard">
            <h3>Modifier les sections</h3>
          </NavLink>
        </div> */}
        {/* <div className="Useroption">
          <NavLink className="RegarderPlusTard">
            <h3>Gérer les catégories</h3>
          </NavLink>
        </div> */}
        <div className="Useroption">
          <div className="RegarderPlusTard">
            <Link to="/favorites">Favoris</Link>
          </div>
        </div>
        <div className="Useroption">
          <div className="RegarderPlusTard">
            <Link to="/watchlist">À regarder plus tard</Link>
          </div>
        </div>
        <div className="Useroption">
          <Link
            className="RegarderPlusTard"
            to="/AjoutAdmin"
            style={{ textDecoration: "none" }}
          >
            <h3>Ajouter des Administrateurs</h3>
          </Link>
        </div>

        {/* <div className="params">
          <NavLink to="/EditVideo">
            <h3>Modifier / supprimer des videos</h3>
          </NavLink>
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
        </div> */}
        <div className="Useroption">
          <button
            className="RegarderPlusTardButton"
            type="button"
            onClick={handleLogOut}
          >
            Déconnexion
          </button>
        </div>
      </section>
    </div>
  );
}

export default ParametreAdmin;

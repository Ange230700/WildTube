import { useNavigate, Link, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function ParametreAdmin() {
  const { user, logout } = useUser();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout(navigate);
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
            (user &&
              user.avatar_filename &&
              `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                user?.avatar_filename
              }`) ||
            user?.avatar_url ||
            "https://avatars.githubusercontent.com/u/97165289"
          }
          alt="Avatar1"
        />
        <h2 className="User">{user && user.name}</h2>
      </div>
      <section className="Useroptionscontainer">
        <div className="Useroption">
          <div className="RegarderPlusTard">
            <Link to="/addvideos">
              <h3>Add videos</h3>
            </Link>
          </div>
        </div>
        {/* <div className="Useroption">
          <div className="RegarderPlusTard">
            <Link to>
              <h3>Modifier les sections</h3>
            </Link>
          </div>
        </div> */}
        {/* <div className="Useroption">
          <div className="RegarderPlusTard">
            <Link to>
              <h3>Gérer les catégories</h3>
            </Link>
          </div>
        </div> */}
        <div className="Useroption">
          <div className="RegarderPlusTard">
            <Link to="/favorites">
              <h3>Favorites</h3>
            </Link>
          </div>
        </div>
        <div className="Useroption">
          <div className="RegarderPlusTard">
            <Link to={`/account/${user && user.id}`}>
              <h3>Account information</h3>
            </Link>
          </div>
        </div>
        <div className="Useroption">
          <div className="RegarderPlusTard">
            <Link to="/watchlist">
              <h3>To watch later</h3>
            </Link>
          </div>
        </div>
        <div className="Useroption">
          <div className="RegarderPlusTard">
            <Link to="/AjoutAdmin">
              <h3>Add Administrators</h3>
            </Link>
          </div>
        </div>
        <div className="Useroption">
          <button
            className="RegarderPlusTard"
            type="button"
            onClick={handleLogOut}
          >
            <h3 className="h3">Disconnect</h3>
          </button>
        </div>
      </section>
    </div>
  );
}

export default ParametreAdmin;

import { useNavigate, Link, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function UserProfil() {
  const { user } = useUser();
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogOut = () => {
    updateUser(null);
    navigate("/");
  };

  return (
    <div
      className="ProfileDisplaySection"
      style={
        location.pathname.includes("/profil")
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
            user.avatar_url ||
            "https://avatars.githubusercontent.com/u/97165289"
          }
          alt="Avatar1"
        />
        <h2 className="User">{user.name}</h2>
      </div>
      <section className="Useroptionscontainer">
        <div className="Useroption">
          <div className="RegarderPlusTard">
            <Link to="/favorites">
              <h3>Favoris</h3>
            </Link>
          </div>
        </div>
        <div className="Useroption">
          <div className="RegarderPlusTard">
            <Link to="/watchlist">
              <h3>À regarder plus tard</h3>
            </Link>
          </div>
        </div>
        <div className="Useroption">
          <div className="RegarderPlusTard">
            <Link to={`/account/${user.id}`}>
              <h3>Informations du compte</h3>
            </Link>
          </div>
        </div>
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

export default UserProfil;

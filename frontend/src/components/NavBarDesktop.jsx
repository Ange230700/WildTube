import { useLocation, NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import ToggleSwitch from "./ToggleSwitch";

function NavBarDesktop() {
  const { user } = useUser();
  const location = useLocation();
  const changeProfile = () => {
    if (user && user.IsAdmin) {
      return "/Parametre";
    }
    if (user) {
      return "/profil";
    }
    return "/connection";
  };

  return (
    <div className="navbar-desktop">
      <img className="logo" src="/src/assets/icons/logo.svg" alt="logo" />
      <div className="links-container">
        <div className="links-wrapper">
          <NavLink className="link" to="/">
            <p className="link-text">Accueil</p>
          </NavLink>
          <NavLink className="link" to="/search">
            <p className="link-text">Recherche</p>
          </NavLink>
        </div>
        {user && user.IsAdmin ? (
          <div className="switchContainer">
            {!location.pathname.includes("/AjoutAdmin") &&
              !location.pathname.includes("/account/") &&
              !location.pathname.includes("/Parametre") &&
              !location.pathname.includes("/addvideos") &&
              !location.pathname.includes("/watchlist") &&
              !location.pathname.includes("/search") &&
              !location.pathname.includes("/movies/") &&
              !location.pathname.includes("/EditVideo/") &&
              !location.pathname.includes("/category/") &&
              !location.pathname.includes("favorites") && (
                <>
                  <h6>Mode admin :</h6>
                  <ToggleSwitch user={user} />
                </>
              )}
          </div>
        ) : null}
        <NavLink className="link" to={changeProfile()}>
          {user ? (
            <img
              className="icon avatar"
              src={
                (user && user.avatar_filename && user.avatar_filename) ||
                (user && user.avatar_url) ||
                "https://avatars.githubusercontent.com/u/97165289"
              }
              alt="avatar"
            />
          ) : (
            <img
              className="icon"
              src="/src/assets/icons/profile_icon.svg"
              alt="connexion"
            />
          )}
        </NavLink>
      </div>
    </div>
  );
}

export default NavBarDesktop;

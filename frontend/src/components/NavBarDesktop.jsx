import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function NavBarDesktop() {
  const { user } = useUser();

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
        <NavLink className="link" to={changeProfile()}>
          {user ? (
            <img
              className="icon avatar"
              src={
                user.avatar
                  ? user.avatar
                  : "https://avatars.githubusercontent.com/u/97165289"
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

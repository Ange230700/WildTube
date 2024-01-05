import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function NavBarDesktop() {
  const { user } = useUser();
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
        <NavLink className="link" to="/Connection">
          {user ? (
            <img
              className="icon"
              src={
                user.civility === 0
                  ? "/src/assets/icons/avatar1.svg"
                  : "/src/assets/icons/FemaleAvatar.svg"
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

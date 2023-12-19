import { NavLink } from "react-router-dom";

function NavBarDesktop() {
  return (
    <div className="navbar-desktop">
      <div className="logo-container">
        <img className="logo" src="/src/assets/icons/logo.svg" alt="logo" />
      </div>
      <div className="links-container">
        <div className="links-wrapper">
          <NavLink className="link" to="/">
            <p className="link-text">Accueil</p>
          </NavLink>
          <NavLink className="link" to="/search">
            <p className="link-text">Recherche</p>
          </NavLink>
        </div>
        {/* <NavLink className="link" to="/profile">
          <p className="link-text">Connexion</p>
        </NavLink> */}
      </div>
    </div>
  );
}

export default NavBarDesktop;

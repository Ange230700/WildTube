import { NavLink } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function NavBar() {
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
    <div className="navbar">
      <div className="nav-icon-container">
        <NavLink to="/" className="div-icon">
          <img
            className="icon"
            src="/src/assets/icons/home_icon.svg"
            alt="home icon"
          />
        </NavLink>
      </div>
      <div className="nav-icon-container">
        <NavLink to="/search" className="div-icon">
          <img
            className="icon"
            src="/src/assets/icons/search_icon.svg"
            alt="search icon"
          />
        </NavLink>
      </div>
      <div className="nav-icon-container">
        <NavLink to={changeProfile()} className="div-icon">
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

export default NavBar;

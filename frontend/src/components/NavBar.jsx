import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <div className="navbar">
      <div className="nav-icon-container">
        <NavLink to="/" className="home-icon">
          <img
            className="icon"
            src="/src/assets/icons/home_icon.svg"
            alt="home icon"
          />
        </NavLink>
      </div>
      <div className="nav-icon-container">
        <NavLink to="/search" className="search-icon">
          <img
            className="icon"
            src="/src/assets/icons/search_icon.svg"
            alt="search icon"
          />
        </NavLink>
      </div>
      <div className="nav-icon-container">
        <NavLink to="/Inscription" className="profile-icon">
          <img
            className="icon"
            src="/src/assets/icons/profile_icon.svg"
            alt="profile icon"
          />
        </NavLink>
      </div>
    </div>
  );
}

export default NavBar;

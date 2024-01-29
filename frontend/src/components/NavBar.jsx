import { NavLink, useLocation } from "react-router-dom";
import { useUser } from "../contexts/UserContext";

function NavBar() {
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
    <nav
      className="navbar"
      style={
        location.pathname.includes("/movies/") ||
        location.pathname.includes("/profil") ||
        location.pathname.includes("/Parametre") ||
        location.pathname.includes("/addvideos") ||
        location.pathname.includes("/EditVideo/")
          ? {
              position: "fixed",
              bottom: "0",
              left: "0",
              right: "0",
              zIndex: "1000",
              backgroundColor: "hsla(210, 89%, 7%, 1)",
            }
          : {}
      }
    >
      <section className="nav-icon-wrapper">
        <div className="nav-icon-container">
          <NavLink to="/" className="div-icon">
            <img
              className="icon"
              src={`${
                import.meta.env.VITE_BACKEND_URL
              }/assets/icons/home_icon.svg`}
              alt="home icon"
            />
          </NavLink>
        </div>
        <div className="nav-icon-container">
          <NavLink to="/search" className="div-icon">
            <img
              className="icon"
              src={`${
                import.meta.env.VITE_BACKEND_URL
              }/assets/icons/search_icon.svg`}
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
                  (user &&
                    `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                      user.avatar_filename
                    }`) ||
                  (user && user.avatar_url) ||
                  "https://avatars.githubusercontent.com/u/97165289"
                }
                alt="avatar"
              />
            ) : (
              <img
                className="icon"
                src={`${
                  import.meta.env.VITE_BACKEND_URL
                }/assets/icons/profile_icon.svg`}
                alt="connexion"
              />
            )}
          </NavLink>
        </div>
      </section>
    </nav>
  );
}

export default NavBar;

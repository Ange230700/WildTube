import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import MovieLink from "../components/MovieLink";

function Favorites() {
  const { isAuthenticated, user } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && isAuthenticated) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/favorites/film/${user.id}`
        )
        .then((response) => {
          setFavorites(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      navigate("/connection");
    }
  }, []);

  return (
    <div className="search">
      <div className="search-display-section">
        <div className="search-bar-container">
          <h2>Favorites</h2>
        </div>
        {/* <div className="sort-container">
          <button type="button" className="sort-button">
            <p className="sort-text">Trier</p>
            <img
              className="sort-icon"
              src="/src/assets/icons/sort_icon.svg"
              alt="sort icon"
            />
          </button>
        </div> */}

        <div className="search-result-container">
          {favorites.map((favoriteMovie) => {
            return <MovieLink key={favoriteMovie.id} movie={favoriteMovie} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Favorites;

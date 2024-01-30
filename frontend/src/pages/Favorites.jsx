import { useState, useEffect } from "react";
import axios from "axios";
import MovieLink from "../components/MovieLink";
import { useUser } from "../contexts/UserContext";

function Favorites() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
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
    }
  }, []);

  return (
    <div className="search">
      <div className="search-display-section">
        <div className="search-bar-container">
          <h2>Favorites</h2>
        </div>

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

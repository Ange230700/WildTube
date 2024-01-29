import { useState, useEffect } from "react";
import axios from "axios";
import MovieLink from "../components/MovieLink";
import { useUser } from "../contexts/UserContext";

function Watchlist() {
  const { user } = useUser();
  const [watchlistItems, setWatchlistItems] = useState([]);

  useEffect(() => {
    if (user) {
      axios
        .get(
          `${import.meta.env.VITE_BACKEND_URL}/api/watchlist/film/${user.id}`
        )
        .then((response) => {
          setWatchlistItems(response.data);
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
          <h2>Watchlist</h2>
        </div>

        <div className="search-result-container">
          {watchlistItems.map((favoriteMovie) => {
            return <MovieLink key={favoriteMovie.id} movie={favoriteMovie} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;

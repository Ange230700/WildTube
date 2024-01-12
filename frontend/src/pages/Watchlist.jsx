import { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import MovieLink from "../components/MovieLink";

function Watchlist() {
  const { user } = useUser();
  const [watchlistItems, setWatchlistItems] = useState([]);

  // console.warn("user id", user.id);

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
          {watchlistItems.map((favoriteMovie) => {
            return <MovieLink key={favoriteMovie.id} movie={favoriteMovie} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Watchlist;

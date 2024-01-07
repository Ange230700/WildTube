import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useUser } from "../contexts/UserContext";
import CommentsSection from "./CommentsSection";

function FreeMovie({ movie }) {
  const { movieId } = useParams();
  const { user } = useUser();
  const [isFavorited, setIsFavorited] = useState(false);
  const [isWatchlisted, setIsWatchlisted] = useState(false);

  // Implement this function to check favorited state
  const checkIfFavorited = async (myMovieId) => {
    try {
      console.warn("user id", user.id, "movie id", myMovieId);
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/favorites/film/${
        user.id
      }`;

      const response = await axios.get(url);
      console.warn("response.data", response.data);
      console.warn(
        "response.data.some",
        response.data.some((fav) => fav.filmId === myMovieId)
      );

      if (response.data.some((fav) => fav.filmId === myMovieId)) {
        setIsFavorited(true);
        return true;
      }

      setIsFavorited(false);
      return false;
    } catch (error) {
      console.error("Error checking favorite status", error);
      return null;
    }
  };

  const handleFavoriteClick = async (myMovieId) => {
    const urlForPosting = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/favorites/film`;
    const urlForDeleting = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/favorites/film/${user.id}/${myMovieId}`;
    const data = {
      userId: user.id,
      filmId: myMovieId,
    };

    const isFavorite = await checkIfFavorited(myMovieId);
    console.warn("isFavorite", isFavorite);

    if (isFavorite) {
      axios
        .delete(urlForDeleting, data)
        .then(() => {
          setIsFavorited(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post(urlForPosting, data)
        .then(() => {
          setIsFavorited(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  // Implement this function to handle watchlist click
  const checkIfWatchlisted = async (myMovieId) => {
    try {
      console.warn("user id", user.id, "movie id", myMovieId);
      const url = `${import.meta.env.VITE_BACKEND_URL}/api/watchlist/film/${
        user.id
      }`;

      const response = await axios.get(url);
      console.warn("response.data", response.data);
      console.warn(
        "response.data.some",
        response.data.some((fav) => fav.filmId === myMovieId)
      );

      if (response.data.some((fav) => fav.filmId === myMovieId)) {
        setIsWatchlisted(true);
        return true;
      }

      setIsWatchlisted(false);
      return false;
    } catch (error) {
      console.error("Error checking watchlist status", error);
      return null;
    }
  };

  const handleWatchlistClick = async (myMovieId) => {
    const urlForPosting = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/watchlist/film`;
    const urlForDeleting = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/watchlist/film/${user.id}/${myMovieId}`;
    const data = {
      userId: user.id,
      filmId: myMovieId,
    };

    const isWatchlistedStatement = await checkIfWatchlisted(myMovieId);
    console.warn("isWatchlisted", isWatchlistedStatement);

    if (isWatchlistedStatement) {
      axios
        .delete(urlForDeleting, data)
        .then(() => {
          setIsWatchlisted(false);
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      axios
        .post(urlForPosting, data)
        .then(() => {
          setIsWatchlisted(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  useEffect(() => {
    if (user && movie.id) {
      checkIfFavorited(movie.id);
    }
  }, [user, movie.id]);

  useEffect(() => {
    if (user && movie.id) {
      checkIfWatchlisted(movie.id);
    }
  }, [user, movie.id]);

  return (
    <div className="movie-page-details" key={parseInt(movieId, 10)}>
      <div className="movie-information-display">
        <div className="thumbnail-container">
          <img className="movie-cover" src={movie.cover} alt={movie.title} />
          <div className="upper-layer">
            <NavLink
              className="play-button-container"
              to={`/moviePlayer/${movie.id}`}
            >
              <img
                className="play-button"
                src="/src/assets/icons/play_button_icon.svg"
                alt="play button"
              />
            </NavLink>
          </div>
        </div>
        <div className="details-option-wrapper">
          <div className="details-container">
            <p className="movie-info release-year">{movie.year}</p>
            <p className="separator">•</p>
            <p className="movie-info duration">{movie.duration}m</p>
          </div>
          {!user ? null : (
            <div className="ActionIcons">
              <button
                className="ThumbsUpRegular1"
                type="button"
                onClick={() => handleFavoriteClick(movie.id)}
              >
                <img
                  className="favourite-icon"
                  src={
                    !isFavorited
                      ? "/src/assets/icons/favourite-icon.svg"
                      : "/src/assets/icons/thumbs-up-solid.svg"
                  }
                  alt="favourite icon"
                />
              </button>
              <button
                className="ThumbsUpRegular1"
                type="button"
                onClick={() => handleWatchlistClick(movie.id)}
              >
                <img
                  className="favourite-icon"
                  src={
                    !isWatchlisted
                      ? "/src/assets/icons/watchlist-icon.svg"
                      : "/src/assets/icons/check-solid.svg"
                  }
                  alt="watchlist icon"
                />
              </button>
            </div>
          )}
        </div>
        <div className="description-container">
          <p className="movie-title">{movie.title}</p>
          <p className="movie-description">{movie.description}</p>
        </div>
        <CommentsSection />
      </div>
    </div>
  );
}

FreeMovie.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default FreeMovie;

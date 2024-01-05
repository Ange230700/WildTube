import { useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { useUser } from "../contexts/UserContext";

function FreeMovie({ movie }) {
  const { movieId } = useParams();
  const { user } = useUser();
  const [isFavorited, setIsFavorited] = useState(false);

  // Implement this function to check favorited state
  const checkIfFavorited = async (myMovieId) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/favorites/film`;
    const data = {
      userId: user.id,
      filmId: myMovieId,
    };

    const rq = await axios.get(url, data);
    if (rq.data.some((favoriteMovie) => favoriteMovie.filmId === myMovieId)) {
      setIsFavorited(true);
      return true;
    }
    setIsFavorited(false);
    return false;
  };

  const handleFavoriteClick = async (myMovieId) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/api/favorites/film`;
    const urlForDeleting = `${
      import.meta.env.VITE_BACKEND_URL
    }/api/favorites/film/${myMovieId}/${user.id}}`;
    const data = {
      userId: user.id,
      filmId: myMovieId,
    };

    const isFavorite = await checkIfFavorited(myMovieId);

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
        .post(url, data)
        .then(() => {
          setIsFavorited(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

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
              {/* <div
                className="PlusSolid1"
                style={{ width: 14, height: 16, position: "relative" }}
              >
                <div
                  className="Vector"
                  style={{
                    width: 13,
                    height: 13,
                    left: 0.5,
                    top: 1.5,
                    position: "absolute",
                    background: "white",
                  }}
                />
              </div> */}
            </div>
          )}
        </div>
        <div className="description-container">
          <p className="movie-title">{movie.title}</p>
          <p className="movie-description">{movie.description}</p>
        </div>
        {/* <div className="comments-section">
          <div className="comments-section-title">
            <p className="comments-section-title-text">Commentaires</p>
          </div>
          <div className="comments-section-content">
            <div className="registration-invitation-container">
              <p className="registration-invitation">
                Connectez-vous pour laisser un commentaire.
              </p>
            </div>
          </div>
        </div> */}
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

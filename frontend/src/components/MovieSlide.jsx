import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useUser } from "../contexts/UserContext";
import { useAdminMode } from "../contexts/AdminModeContext";

function MovieSlide({
  movie,
  categorie,
  selectedMovies,
  setSelectedMovies,
  originalSelectedMovies,
  fetchMoviesByCategorie,
  isDeleting,
  setIsDeleting,
}) {
  const { user } = useUser();
  const { isAdminMode } = useAdminMode();
  const location = useLocation();
  const [isChecked, setIsChecked] = useState(selectedMovies.has(movie.id));

  const deleteMovieFromSection = () => {
    setIsDeleting(true);

    axios
      .delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/film/${movie.id}/category/${
          categorie.id
        }`
      )
      .then((response) => {
        if (response.status === 200) {
          toast.success("Movie removed from section");
        }
      })
      .catch((error) => {
        console.error(error);
        toast.error("Failed to remove movie from section");
      })
      .finally(() => {
        setIsDeleting(false);
      });
  };

  const handleMovieDeletionFromSection = () => {
    if (user && user.IsAdmin && isAdminMode) {
      deleteMovieFromSection();
    }
  };

  const handleCheck = () => {
    const newSelectedMovies = new Set(selectedMovies);
    if (newSelectedMovies.has(movie.id)) {
      newSelectedMovies.delete(movie.id);
    } else {
      newSelectedMovies.add(movie.id);
    }
    setSelectedMovies(newSelectedMovies);
  };

  useEffect(() => {
    setIsChecked(selectedMovies.has(movie.id));
  }, [selectedMovies, originalSelectedMovies, movie.id]);

  useEffect(() => {
    if (typeof fetchMoviesByCategorie === "function") {
      fetchMoviesByCategorie();
    }
  }, [movie.id, fetchMoviesByCategorie]);

  if (
    (location.pathname.includes("/EditSection/") ||
      location.pathname.includes("/AddSection")) &&
    user &&
    user.IsAdmin &&
    isAdminMode
  ) {
    return (
      <label className="movie-checkbox-label">
        <input
          type="checkbox"
          className="movie-checkbox-input"
          checked={isChecked}
          onChange={handleCheck}
        />
        <span className="custom-checkbox" />
        <div
          className="movie-slide-requiring-registration"
          style={{
            filter: "none",
          }}
        >
          <img
            src={
              (movie.miniature_filename &&
                `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                  movie?.miniature_filename
                }`) ||
              movie?.miniature_url
            }
            alt={movie.title}
            className="movie-slide blur-filter"
          />
        </div>
        <div
          className="locked-overlay"
          style={{
            backgroundColor: "#00000055",
            border: "none",
            outline: "none",
          }}
        >
          <div className="lock-icon-container">
            <img
              className="lock-icon"
              src={`/src/assets/icons/${isChecked ? "remove2" : "add4"}.svg`}
              alt={isChecked ? "Remove" : "Add"}
            />
          </div>
        </div>
      </label>
    );
  }

  if (user && user.IsAdmin && isAdminMode) {
    return (
      (!isDeleting && (
        <>
          <div
            className="movie-slide-requiring-registration"
            style={{
              filter: "none",
            }}
          >
            <img
              src={
                (movie.miniature_filename &&
                  `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                    movie?.miniature_filename
                  }`) ||
                movie?.miniature_url
              }
              alt={movie.title}
              className="movie-slide blur-filter"
            />
          </div>
          <button
            className="locked-overlay"
            style={{
              backgroundColor: "#00000055",
              border: "none",
              outline: "none",
            }}
            type="button"
            onClick={handleMovieDeletionFromSection}
          >
            <div className="lock-icon-container">
              <img
                className="lock-icon"
                src="/src/assets/icons/remove2.svg"
                alt="Remove"
              />
            </div>
          </button>
        </>
      )) ||
      null
    );
  }

  return movie.IsAvailable || user ? (
    <div>
      <img
        src={
          (movie.miniature_filename &&
            `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
              movie?.miniature_filename
            }`) ||
          movie?.miniature_url
        }
        alt={movie.title}
        className="movie-slide"
      />
    </div>
  ) : (
    <>
      <div className="movie-slide-requiring-registration">
        <img
          src={
            (movie.miniature_filename &&
              `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                movie?.miniature_filename
              }`) ||
            movie?.miniature_url
          }
          alt={movie.title}
          className="movie-slide blur-filter"
        />
      </div>
      <div className="locked-overlay">
        <div className="lock-icon-container">
          <img
            className="lock-icon"
            src="/src/assets/icons/lock_icon.svg"
            alt="lock icon"
          />
        </div>
      </div>
    </>
  );
}

MovieSlide.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    miniature_filename: PropTypes.string,
    miniature_url: PropTypes.string,
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string,
    duration: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    IsAvailable: PropTypes.number.isRequired,
  }).isRequired,
  selectedMovies: PropTypes.instanceOf(Set),
  setSelectedMovies: PropTypes.func,
  originalSelectedMovies: PropTypes.instanceOf(Set),
  categorie: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  fetchMoviesByCategorie: PropTypes.func,
  isDeleting: PropTypes.bool,
  setIsDeleting: PropTypes.func,
};

MovieSlide.defaultProps = {
  selectedMovies: new Set(),
  setSelectedMovies: () => {},
  originalSelectedMovies: new Set(),
  fetchMoviesByCategorie: () => {},
  isDeleting: false,
  setIsDeleting: () => {},
  categorie: {},
};

export default MovieSlide;

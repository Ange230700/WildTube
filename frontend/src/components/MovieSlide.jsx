import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
// import { toast } from "react-hot-toast";
import { useUser } from "../contexts/UserContext";
import { useAdminMode } from "../contexts/AdminModeContext";

function MovieSlide({
  movie,
  selectedMovies,
  setSelectedMovies,
  originalSelectedMovies,
}) {
  const { user } = useUser();
  const { isAdminMode } = useAdminMode();
  const location = useLocation();

  const handleCheck = () => {
    const newSelectedMovies = new Set(selectedMovies);
    if (newSelectedMovies.has(movie)) {
      newSelectedMovies.delete(movie);
    } else {
      newSelectedMovies.add(movie);
    }
    setSelectedMovies(newSelectedMovies);
  };

  if (
    location.pathname.includes("/EditSection/") &&
    user &&
    user.IsAdmin &&
    isAdminMode
  ) {
    return (
      <label className="movie-checkbox-label">
        <input
          type="checkbox"
          className="movie-checkbox-input"
          checked={
            selectedMovies.has(movie) || originalSelectedMovies.has(movie)
          }
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
              src={`/src/assets/icons/${
                selectedMovies.has(movie) || originalSelectedMovies.has(movie)
                  ? "remove2"
                  : "add4"
              }.svg`}
              alt="lock icon"
            />
          </div>
        </div>
      </label>
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
    miniature_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string,
    duration: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    IsAvailable: PropTypes.number.isRequired,
  }).isRequired,
  selectedMovies: PropTypes.instanceOf(Set),
  setSelectedMovies: PropTypes.func,
  originalSelectedMovies: PropTypes.instanceOf(Set).isRequired,
};

MovieSlide.defaultProps = {
  selectedMovies: new Set(),
  setSelectedMovies: () => {},
};

export default MovieSlide;

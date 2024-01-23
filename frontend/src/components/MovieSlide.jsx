/*eslint-disable */
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
// import { NavLink } from "react-router-dom";

function MovieSlide({ movie }) {
  const { user } = useAuth();
  return movie.IsAvailable || user ? (
    <div>
      <img src={movie.miniature} alt={movie.title} className="movie-slide" />
      <img
        src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${
          movie.miniature
        }`}
        alt={movie.title}
        className="movie-slide"
      />
    </div>
  ) : (
    <>
      <div className="movie-slide-requiring-registration">
        <img
          src={movie.miniature}
          alt={movie.title}
          className="movie-slide blur-filter"
        />
        <img
          src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${
            movie.miniature
          }`}
          alt={movie.title}
          className="movie-slide"
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
    miniature: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string,
    duration: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    IsAvailable: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieSlide;

/*eslint-disable */
import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";
// import { NavLink } from "react-router-dom";

function MovieSlide({ movie }) {
  const { user } = useUser();
  return movie.IsAvailable || user ? (
    <img src={movie.miniature} alt={movie.title} className="movie-slide" />
  ) : (
    <>
      <div className="movie-slide-requiring-registration">
        <img
          src={movie.miniature}
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

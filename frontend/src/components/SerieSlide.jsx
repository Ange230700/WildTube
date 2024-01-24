import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";
// import { NavLink } from "react-router-dom";

function SerieSlide({ serie }) {
  const { user } = useUser;
  if (serie.IsAvailable || !user) {
    return (
      <img src={serie.miniature} alt={serie.title} className="movie-slide" />
    );
  }
  return (
    <div className="movie-slide-requiring-registration">
      <img src={serie.miniature} alt={serie.title} className="movie-slide" />
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
  );
}

SerieSlide.propTypes = {
  serie: PropTypes.shape({
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

export default SerieSlide;

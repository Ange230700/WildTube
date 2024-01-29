import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import CommentsSection from "./CommentsSection";

function MovieLoginRequired({ movie }) {
  const { movieId } = useParams();
  return (
    <div
      className="movie-page-details"
      key={parseInt(movieId, 10)}
      style={{ overflowY: "hidden" }}
    >
      <div className="movie-information-display-wrapper">
        <div className="movie-information-display">
          <div className="thumbnail-container">
            <img
              className="movie-cover"
              src={
                `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                  movie?.cover_filename
                }` || movie?.cover_url
              }
              alt={movie.title}
            />
            <div className="upper-layer">
              <div className="play-button-container">
                <img
                  className="play-button"
                  src={`${
                    import.meta.env.VITE_BACKEND_URL
                  }/assets/icons/play_button_icon.svg`}
                  alt="play button"
                />
              </div>
            </div>
          </div>
          <div className="details-option-wrapper">
            <div className="details-container">
              <p className="movie-info release-year">{movie.year}</p>
              <p className="separator">•</p>
              <p className="movie-info duration">{movie.duration}m</p>
            </div>
          </div>
          <div className="description-container">
            <p className="movie-title">{movie.title}</p>
            <p className="movie-description">{movie.description}</p>
          </div>
          <CommentsSection />
        </div>
        <div className="upper-layer">
          <div className="registration-invitation-container">
            <p className="registration-invitation">
              Connectez-vous pour regarder ce film.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

MovieLoginRequired.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cover_filename: PropTypes.string,
    cover_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieLoginRequired;

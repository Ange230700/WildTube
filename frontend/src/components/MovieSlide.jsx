/*eslint-disable */
import PropTypes from "prop-types";
import { useUser } from "../contexts/UserContext";
import { useAdminMode } from "../contexts/AdminModeContext";
// import { NavLink } from "react-router-dom";

function MovieSlide({ movie }) {
  const { user } = useUser();
  const { isAdminMode } = useAdminMode();
  if (user && user.IsAdmin && isAdminMode) {
    return (
      <>
        <div
          className="movie-slide-requiring-registration"
          style={{
            filter: "blur(0px)",
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
          }}
        >
          <div className="lock-icon-container">
            <img
              className="lock-icon"
              src="/src/assets/icons/remove2.svg"
              alt="lock icon"
            />
          </div>
        </div>
      </>
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
};

export default MovieSlide;

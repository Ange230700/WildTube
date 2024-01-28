import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import MovieSlide from "./MovieSlide";
import { useUser } from "../contexts/UserContext";
import { useAdminMode } from "../contexts/AdminModeContext";

function MovieLink({
  movie,
  selectedMovies,
  setSelectedMovies,
  originalSelectedMovies,
}) {
  const { user } = useUser();
  const { isAdminMode } = useAdminMode();

  if (!movie) {
    return null;
  }
  return (
    <NavLink
      key={movie.id}
      to={!(user && user.IsAdmin && isAdminMode) && `/movies/${movie.id}`}
      className="movie-link"
    >
      <MovieSlide
        movie={movie}
        selectedMovies={selectedMovies}
        setSelectedMovies={setSelectedMovies}
        originalSelectedMovies={originalSelectedMovies}
      />
    </NavLink>
  );
}

MovieLink.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    miniature_url: PropTypes.string,
    miniature_filename: PropTypes.string,
    cover_url: PropTypes.string,
    cover_filename: PropTypes.string,
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    IsAvailable: PropTypes.number.isRequired,
  }).isRequired,
  selectedMovies: PropTypes.instanceOf(Set),
  setSelectedMovies: PropTypes.func,
  originalSelectedMovies: PropTypes.instanceOf(Set),
};

MovieLink.defaultProps = {
  selectedMovies: new Set(),
  setSelectedMovies: () => {},
  originalSelectedMovies: new Set(),
};

export default MovieLink;

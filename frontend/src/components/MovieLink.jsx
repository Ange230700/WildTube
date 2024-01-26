import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import MovieSlide from "./MovieSlide";
import { useUser } from "../contexts/UserContext";
import { useAdminMode } from "../contexts/AdminModeContext";

function MovieLink({
  movie,
  categorie,
  fetchMoviesByCategorie,
  isMovieInCategory,
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
        categorie={categorie}
        fetchMoviesByCategorie={fetchMoviesByCategorie}
        isMovieInCategory={isMovieInCategory}
      />
    </NavLink>
  );
}

MovieLink.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  categorie: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  fetchMoviesByCategorie: PropTypes.func.isRequired,
  isMovieInCategory: PropTypes.func.isRequired,
};

export default MovieLink;

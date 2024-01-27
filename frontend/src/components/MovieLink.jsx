import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import MovieSlide from "./MovieSlide";
import { useUser } from "../contexts/UserContext";
import { useAdminMode } from "../contexts/AdminModeContext";

function MovieLink({ movie, categorie, fetchMoviesByCategorie }) {
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
  }),
  fetchMoviesByCategorie: PropTypes.func,
};

MovieLink.defaultProps = {
  categorie: null,
  fetchMoviesByCategorie: null,
};

export default MovieLink;

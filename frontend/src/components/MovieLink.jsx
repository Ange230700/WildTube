import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import MovieSlide from "./MovieSlide";

function MovieLink({ movie }) {
  if (!movie || !movie.id) {
    console.error("MovieLink", "movie is not valid", movie);
    return null;
  }
  return (
    <NavLink key={movie.id} to={`/movies/${movie.id}`} className="movie-link">
      <MovieSlide movie={movie} />
    </NavLink>
  );
}

MovieLink.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieLink;

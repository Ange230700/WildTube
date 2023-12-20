import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import FreeMovie from "./FreeMovie";
import MovieLoginRequired from "./MovieLoginRequired";

function MovieDescription({ movie }) {
  const { movieId } = useParams();
  if (!movieId) {
    return <h1>Aucun film trouvé.</h1>;
  }
  if (movie.IsAvailable) {
    return <FreeMovie movie={movie} />;
  }
  return <MovieLoginRequired movie={movie} />;
}

MovieDescription.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    cover: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    IsAvailable: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieDescription;

import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import FreeMovie from "./FreeMovie";
import MovieLoginRequired from "./MovieLoginRequired";

function MovieDescription({ movie }) {
  const { user } = useUser();
  const { movieId } = useParams();
  if (!movieId) {
    return <h1>Aucun film trouvé.</h1>;
  }
  if (movie.IsAvailable || user) {
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

import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import FreeMovie from "./FreeMovie";
import MovieLoginRequired from "./MovieLoginRequired";
import { useUser } from "../contexts/UserContext";

function MovieDescription({ movie }) {
  const { user } = useUser();
  const { movieId } = useParams();
  if (!movieId) {
    return <h1>No films found.</h1>;
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
    cover_filename: PropTypes.string,
    cover_url: PropTypes.string.isRequired,
    year: PropTypes.string.isRequired,
    duration: PropTypes.number.isRequired,
    IsAvailable: PropTypes.number.isRequired,
  }).isRequired,
};

export default MovieDescription;

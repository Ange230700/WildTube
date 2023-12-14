import { useParams } from "react-router-dom";

function Movie() {
  const { movieId } = useParams();
  if (!movieId) {
    return <h1>Movie not found</h1>;
  }
  return <h1>Movie {movieId}</h1>;
}

export default Movie;

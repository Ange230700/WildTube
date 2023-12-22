import { useParams } from "react-router-dom";
import { useMovies } from "../contexts/MovieContext";
import MovieDescription from "../components/MovieDescription";

function Movie() {
  const { movieId } = useParams();
  const { movies } = useMovies();

  if (!movieId) {
    return <h1>Aucun film trouvé.</h1>;
  }
  return (
    <>
      {movies
        .filter((movie) => {
          return movie.id === parseInt(movieId, 10);
        })
        .map((movie) => {
          return <MovieDescription key={movie.id} movie={movie} />;
        })}
    </>
  );
}

export default Movie;

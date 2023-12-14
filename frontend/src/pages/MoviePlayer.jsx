/* eslint-disable jsx-a11y/media-has-caption */
import { useParams } from "react-router-dom";
import { useMovies } from "../contexts/MovieContext";

function MoviePlayer() {
  const { movieId } = useParams();
  const { movies } = useMovies();
  return (
    <div className="movie-player-wrapper">
      {movies
        .filter((movie) => {
          return movie.id === parseInt(movieId, 10);
        })
        .map((movie) => {
          //   console.info(movie.videoUrl);
          return (
            <div className="movie-player-container" key={movie.id}>
              <div className="movie-player">
                <video
                  className="movie-player-video"
                  src={movie.videoUrl}
                  controls
                />
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default MoviePlayer;

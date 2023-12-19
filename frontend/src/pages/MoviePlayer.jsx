/* eslint-disable react/self-closing-comp  */
import { useParams, NavLink } from "react-router-dom";
import { useMovies } from "../contexts/MovieContext";

function MoviePlayer() {
  const { movieId } = useParams();
  const { movies } = useMovies();
  return (
    <div className="movie-player">
      <div className="back-to-previous-page">
        <NavLink to={`/movies/${movieId}`}>
          <img
            className="back-arrow"
            src="/src/assets/icons/circle-arrow-left-solid.svg"
            alt="back arrow"
          />
        </NavLink>
      </div>
      <div className="movie-player-wrapper">
        {movies
          .filter((movie) => {
            return movie.id === parseInt(movieId, 10);
          })
          .map((movie) => {
            const videoId = new URL(movie.videoUrl).searchParams.get("v");
            const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=1&start=0&end=30`;
            return (
              <iframe
                key={movie.id}
                className="movie-player-iframe"
                src={embedUrl}
                title="Marvel Studios&#39; Avengers: Infinity War Official Trailer"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
              ></iframe>
            );
          })}
      </div>
    </div>
  );
}

export default MoviePlayer;

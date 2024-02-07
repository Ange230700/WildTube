import { useParams, NavLink } from "react-router-dom";
import { useMovies } from "../contexts/MovieContext";

// § Implement a video html tag to play the video if the videoFilename exists in the database.

function MoviePlayer() {
  const { movieId } = useParams();
  const { movies } = useMovies();
  return (
    <div className="movie-player">
      <div className="back-to-previous-page">
        <NavLink
          className="back-to-previous-page-link"
          to={`/movies/${movieId}`}
        >
          <img
            className="back-arrow"
            src={`${
              import.meta.env.VITE_BACKEND_URL
            }/assets/icons/circle-arrow-left-solid.svg`}
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
            let embedUrl = "";

            if (movie.videoUrl) {
              const videoId = new URL(movie.videoUrl).searchParams.get("v");
              embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&start=0&end=30&loop=1`;
            }
            return movie.videoFilename ? (
              <video
                key={movie.id}
                className="movie-player-iframe"
                controls
                autoPlay
                loop
                muted
                src={`${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                  movie.videoFilename
                }`}
                type="video/mp4"
              />
            ) : (
              <iframe
                key={movie.id}
                className="movie-player-iframe"
                src={embedUrl}
                title={movie.title}
                frameBorder="0"
                allowFullScreen
                loading="lazy"
              />
            );
          })}
      </div>
    </div>
  );
}

export default MoviePlayer;

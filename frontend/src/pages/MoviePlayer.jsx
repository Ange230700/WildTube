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
            const embedUrl = `https://www.youtube.com/embed/${videoId}`;
            return (
              <iframe
                key={movie.id}
                width="789"
                height="328"
                src={embedUrl}
                title="Marvel Studios&#39; Avengers: Infinity War Official Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            );
          })}
      </div>
    </div>
  );
}

export default MoviePlayer;

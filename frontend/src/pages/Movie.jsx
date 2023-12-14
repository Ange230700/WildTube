import { useParams } from "react-router-dom";
import { useMovies } from "../contexts/MovieContext";

function Movie() {
  const { movieId } = useParams();
  const { movies } = useMovies();
  console.info(movies);
  if (!movieId) {
    return <h1>Movie not found</h1>;
  }
  return (
    <div className="movie-page-details">
      {movies
        .filter((movie) => {
          return movie.id === parseInt(movieId, 10);
        })
        .map((movie) => {
          return (
            <div
              key={parseInt(movieId, 10)}
              className="movie-information-display"
            >
              <div className="thumbnail-container">
                <img
                  className="movie-cover"
                  src={movie.cover}
                  alt={movie.title}
                />
                <div className="upper-layer">
                  <div className="play-button-container">
                    <img
                      className="play-button"
                      src="/src/assets/icons/play_button_icon.svg"
                      alt="play button"
                    />
                  </div>
                </div>
              </div>
              <div className="details-option-wrapper">
                <div className="details-container">
                  <p className="movie-info release-year">{movie.year}</p>
                  <p className="separator">•</p>
                  <p className="movie-info duration">{movie.duration}m</p>
                </div>
              </div>
              <div className="description-container">
                <p className="movie-title">{movie.title}</p>
                <p className="movie-description">{movie.description}</p>
              </div>
              <div className="comments-section">
                <div className="comments-section-title">
                  <p className="comments-section-title-text">Commentaires</p>
                </div>
                <div className="comments-section-content">
                  <div className="registration-invitation-container">
                    <p className="registration-invitation">
                      Connectez-vous pour laisser un commentaire
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Movie;

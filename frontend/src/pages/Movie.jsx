/*eslint-disable */
import { useParams, NavLink } from "react-router-dom";
import { useMovies } from "../contexts/MovieContext";
import { useUser } from "../contexts/UserContext";

function Movie() {
  const { user } = useUser;
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
          if (movie.IsAvailable) {
            return (
              <div className="movie-page-details" key={parseInt(movieId, 10)}>
                <div className="movie-information-display">
                  <div className="thumbnail-container">
                    <img
                      className="movie-cover"
                      src={movie.cover}
                      alt={movie.title}
                    />
                    <div className="upper-layer">
                      <NavLink
                        className="play-button-container"
                        to={`/moviePlayer/${movie.id}`}
                      >
                        <img
                          className="play-button"
                          src="/src/assets/icons/play_button_icon.svg"
                          alt="play button"
                        />
                      </NavLink>
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
                      <p className="comments-section-title-text">
                        Commentaires
                      </p>
                    </div>
                    <div className="comments-section-content">
                      <div className="registration-invitation-container">
                        <p className="registration-invitation">
                          Connectez-vous pour laisser un commentaire.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          }
          return (
            <div
              className="movie-page-details"
              key={parseInt(movieId, 10)}
              style={{ overflowY: "hidden" }}
            >
              <div className="movie-information-display-wrapper">
                <div className="movie-information-display">
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
                      <p className="comments-section-title-text">
                        Commentaires
                      </p>
                    </div>
                    <div className="comments-section-content">
                      <div className="registration-invitation-container">
                        <p className="registration-invitation">
                          Connectez-vous pour laisser un commentaire.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="upper-layer">
                  <div className="registration-invitation-container">
                    <p className="registration-invitation">
                      Connectez-vous pour regarder ce film.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </>
  );
}

export default Movie;

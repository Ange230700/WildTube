import { useEffect, useState } from "react";
import axios from "axios"; // eslint-disable-line

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/films")
      .then((response) => {
        setMovies(response.data);
        console.info(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div className="home">
      <div className="movies-display-section">
        <div className="logo-container">
          <img
            className="logo"
            src="/src/assets/icons/logo.svg"
            alt="wildtube logo"
          />
        </div>
        {/* <div className="dynamic-hero-slider-container">
        </div> */}
        <ul className="movie-genre-tabs-container">
          <li className="movie-genre-tab-container">
            <p className="movie-genre selected-tab">Toutes les catégories</p>
          </li>
          <li className="movie-genre-tab-container">
            <p className="movie-genre">Action</p>
          </li>
          <li className="movie-genre-tab-container">
            <p className="movie-genre">Aventure</p>
          </li>
          <li className="movie-genre-tab-container">
            <p className="movie-genre">Comédie</p>
          </li>
          <li className="movie-genre-tab-container">
            <p className="movie-genre">Romance</p>
          </li>
          <li className="movie-genre-tab-container">
            <p className="movie-genre">Science-fiction</p>
          </li>
        </ul>
        <section className="category-movie-display-container">
          <div className="category-title-container">
            <p className="category-title">Action</p>
            <p className="category-page-link">Voir tout</p>
          </div>
          <div className="static-slider-container">
            <img src="" alt="movie slide" className="movie-slide" />
            <div className="movie-slide-requiring-registration">
              <img src="" alt="movie slide" className="movie-slide" />
              <div className="locked-overlay">
                <div className="lock-icon-container">
                  <img
                    className="lock-icon"
                    src="/src/assets/icons/lock_icon.svg"
                    alt="lock icon"
                  />
                </div>
              </div>
            </div>
            {movies.map((movie) => {
              if (!movie.is_available) {
                return (
                  <img
                    key={movie.id}
                    src={movie.miniature}
                    alt={movie.title}
                    className="movie-slide"
                  />
                );
              }

              return (
                <div
                  key={movie.id}
                  className="movie-slide-requiring-registration"
                >
                  <img
                    src={movie.miniature}
                    alt={movie.title}
                    className="movie-slide"
                  />
                  <div className="locked-overlay">
                    <div className="lock-icon-container">
                      <img
                        className="lock-icon"
                        src="/src/assets/icons/lock_icon.svg"
                        alt="lock icon"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
      <div className="navbar">
        <div className="nav-icon-container">
          <div className="home-icon">
            <img
              className="icon"
              src="/src/assets/icons/home_icon.svg"
              alt="home icon"
            />
          </div>
        </div>
        <div className="nav-icon-container">
          <div className="search-icon">
            <img
              className="icon"
              src="/src/assets/icons/search_icon.svg"
              alt="search icon"
            />
          </div>
        </div>
        <div className="nav-icon-container">
          <div className="profile-icon">
            <img
              className="icon"
              src="/src/assets/icons/profile_icon.svg"
              alt="profile icon"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

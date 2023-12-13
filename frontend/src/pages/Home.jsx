import { useMovies } from "../contexts/MovieContext";

function Home() {
  const { movies } = useMovies();

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
        {/* <ul className="movie-genre-tabs-container">
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
        </ul> */}
        <section className="category-movie-display-container">
          {/* <div className="category-title-container">
            <p className="category-title">Action</p>
            <p className="category-page-link">Voir tout</p>
          </div> */}
          <div className="static-slider-container">
            {movies.map((movie) => {
              if (movie.IsAvailable) {
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
    </div>
  );
}

export default Home;

function App() {
  return (
    <div className="home">
      <div className="movies-display-section">
        <div className="logo-container">
          <img
            className="logo"
            src="https://via.placeholder.com/75x45"
            alt="wildtube logo"
          />
        </div>
        <div className="dynamic-hero-slider-container">
          <img
            src="https://via.placeholder.com/256x140"
            alt="hero movie slide"
            className="hero-movie-slide"
          />
          <img
            src="https://via.placeholder.com/256x140"
            alt="hero movie slide"
            className="hero-movie-slide"
          />
          <img
            src="https://via.placeholder.com/256x140"
            alt="hero movie slide"
            className="hero-movie-slide"
          />
          <img
            src="https://via.placeholder.com/256x140"
            alt="hero movie slide"
            className="hero-movie-slide"
          />
          <img
            src="https://via.placeholder.com/256x140"
            alt="hero movie slide"
            className="hero-movie-slide"
          />
        </div>
        <ul className="movie-genre-tabs-container">
          <li className="movie-genre-tab-container">
            <p className="movie-genre">Toutes les catégories</p>
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
      </div>
    </div>
  );
}

export default App;

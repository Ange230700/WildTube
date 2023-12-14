import { NavLink } from "react-router-dom";
import { useMovies } from "../contexts/MovieContext";
import MovieSlide from "../components/MovieSlide";

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
            {movies.map((movie) => (
              <NavLink key={movie.id} to={`/movies/${movie.id}`}>
                <MovieSlide key={movie.id} movie={movie} />
              </NavLink>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;

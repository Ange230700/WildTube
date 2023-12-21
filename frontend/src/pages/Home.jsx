import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMovies } from "../contexts/MovieContext";
import DynamicHeroSlider from "../components/DynamicHeroSlider";
// import MovieLink from "../components/MovieLink";
import MovieSlide from "../components/MovieSlide";

function Home() {
  const { movies } = useMovies();
  const [categories, setCategories] = useState([]);
  const [entendance, setEnTendance] = useState([]);

  const getcategories = () => {
    axios

      .get("http://localhost:3310/api/categories")

      .then((response) => {
        setCategories(response.data);
      });
  };
  useEffect(() => {
    getcategories();
  }, []);

  const getentendance = () => {
    axios

      .get("http://localhost:3310/api/FilmsEnTendance")

      .then((response) => {
        setEnTendance(response.data);
      });
  };
  useEffect(() => {
    getentendance();
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
        <div className="MovieGenreTabsContainer">
          <div className="MovieGenreTabContainerAll">
            <div className="All">All</div>
          </div>
          <div className="MovieGenreContainer">
            {categories.map((cat) => {
              return (
                <Link
                  className="MovieGenreContainerStyle"
                  key={cat.id}
                  to={`/category/${cat.id}`}
                  state={cat.id}
                >
                  <div>{cat.name}</div>
                </Link>
              );
            })}
          </div>
        </div>

        <div className="CategoryTitleContainer">
          <div className="CategoryTitle">Recommandations</div>
          <div className="CategoryPageLink">Show all</div>
        </div>

        <DynamicHeroSlider movies={movies} />
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
          <div className="static-slider-container">
            {movies.map((movie) => (
              <Link key={movie.id} to={`/movies/${movie.id}`}>
                <MovieSlide movie={movie} />
              </Link>
            ))}
          </div>
        </section>

        <div className="CategoryTitleContainer">
          <div className="CategoryTitle">Nouveautés</div>
          <div className="CategoryPageLink">Show all</div>
        </div>

        <section className="category-movie-display-container">
          <div className="static-slider-container">
            {entendance.map((movie) => (
              <Link key={movie.id} to={`/movies/${movie.id}`}>
                <MovieSlide movie={movie} />
              </Link>
            ))}
          </div>
        </section>

        <div className="CategoryTitleContainer">
          <div className="CategoryTitle">En tendances</div>
          <div className="CategoryPageLink">Show all</div>
        </div>

        <section className="category-movie-display-container">
          <div className="static-slider-container">
            {entendance.map((movie) => (
              <Link key={movie.id} to={`/movies/${movie.id}`}>
                <MovieSlide movie={movie} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;

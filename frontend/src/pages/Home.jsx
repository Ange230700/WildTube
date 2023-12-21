import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMovies } from "../contexts/MovieContext";
import DynamicHeroSlider from "../components/DynamicHeroSlider";
import MovieLink from "../components/MovieLink";

function Home() {
  const { movies } = useMovies();
  const [categories, setCategories] = useState([]);
  // const [entendance, setEnTendance] = useState([]);

  const getcategories = () => {
    axios
      .get("http://localhost:3310/api/categories")
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    getcategories();
  }, []);

  // const getentendance = () => {
  //   axios
  //     .get("http://localhost:3310/api/FilmsEnTendance")
  //     .then((response) => {
  //       setEnTendance(response.data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };
  // useEffect(() => {
  //   getentendance();
  // }, []);

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
        <DynamicHeroSlider movies={movies} />
        <ul className="movie-genre-tabs-container">
          <li className="movie-genre-tab-container">
            <p className="movie-genre selected-tab">Toutes les catégories</p>
          </li>
          {categories.map((cat) => {
            return (
              <li className="movie-genre-tab-container" key={cat.id}>
                <Link
                  className="movie-genre selected-tab"
                  to={`/category/${cat.id}`}
                  state={cat.id}
                >
                  {cat.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <section className="category-movie-display-container">
          <div className="category-title-container">
            <div className="category-title">Recommandations</div>
            <div className="category-page-link">Show all</div>
          </div>
          <div className="static-slider-container">
            {movies.map((movie) => (
              <MovieLink key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
        <section className="category-movie-display-container">
          <div className="category-title-container">
            <div className="category-title">Recommandations</div>
            <div className="category-page-link">Show all</div>
          </div>
          <div className="static-slider-container">
            {movies.map((movie) => (
              <MovieLink key={movie.id} movie={movie} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;

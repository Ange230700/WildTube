import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { useMovies } from "../contexts/MovieContext";
import DynamicHeroSlider from "../components/DynamicHeroSlider";
import MovieLink from "../components/MovieLink";

function Home() {
  const { movies } = useMovies();
  const [categories, setCategories] = useState([]);
  const [entendance, setEnTendance] = useState([]);
  const [scienceFiction, setScienceFiction] = useState([]);

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

      .get("http://localhost:3310/api/films/category/1")

      .then((response) => {
        setEnTendance(response.data);
      });
  };
  useEffect(() => {
    getentendance();
  }, []);

  const getScienceFiction = () => {
    axios

      .get("http://localhost:3310/api/films/category/3")

      .then((response) => {
        setScienceFiction(response.data);
      });
  };
  useEffect(() => {
    getScienceFiction();
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

        <DynamicHeroSlider movies={movies} />

        <div className="CategoryTitleContainer">
          <div className="CategoryTitle">All</div>
        </div>

        <section className="category-movie-display-container">
          <div className="static-slider-container">
            {movies.map((movie) => (
              <Link key={movie.id} to={`/movies/${movie.id}`}>
                <MovieLink movie={movie} />
              </Link>
            ))}
          </div>
        </section>

        <div className="CategoryTitleContainer">
          <div className="CategoryTitle">Action</div>
        </div>

        {/* get all sections 
        sections.map(() => {
          return 
            <Carousel>
              get all movies
              movies.map((movie ) => {
                return <VideoCard movie={movie}>
              })
            </Carousel>
        })
        */}

        <section className="category-movie-display-container">
          <div className="static-slider-container">
            {entendance.map((movie) => (
              <Link key={movie.filmId} to={`/movies/${movie.filmId}`}>
                <MovieLink movie={movie} />
              </Link>
            ))}
          </div>
        </section>

        <div className="CategoryTitleContainer">
          <div className="CategoryTitle">Science Fiction</div>
        </div>

        <section className="category-movie-display-container">
          <div className="static-slider-container">
            {scienceFiction.map((movie) => (
              <Link key={movie.id} to={`/movies/${movie.id}`}>
                <MovieLink movie={movie} />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default Home;

import { useState, useEffect } from "react";
import axios from "axios";
import { useMovies } from "../contexts/MovieContext";
import DynamicHeroSlider from "../components/DynamicHeroSlider";
import CategoryDisplay from "../components/CategoryDisplay";
import MovieGenreTabsContainer from "../components/MovieGenreTabsContainer";

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
        <MovieGenreTabsContainer categories={categories} />
        {categories.map((categorie) => (
          <CategoryDisplay
            key={categorie.id}
            categorie={categorie}
            movies={movies}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;

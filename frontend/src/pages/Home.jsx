import { useState, useEffect } from "react";
import axios from "axios";
import { useMovies } from "../contexts/MovieContext";
import DynamicHeroSlider from "../components/DynamicHeroSlider";
import CategoryDisplay from "../components/CategoryDisplay";
import MovieGenreTabsContainer from "../components/MovieGenreTabsContainer";
import LogoContainer from "../components/LogoContainer";

function Home() {
  const { movies } = useMovies();
  const [categories, setCategories] = useState([]);

  const getcategories = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)
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

  return (
    <div className="home">
      <div className="movies-display-section">
        <LogoContainer />
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

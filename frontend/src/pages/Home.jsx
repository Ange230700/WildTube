import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMovies } from "../contexts/MovieContext";
import DynamicHeroSlider from "../components/DynamicHeroSlider";
import CategoryDisplay from "../components/CategoryDisplay";
import MovieGenreTabsContainer from "../components/MovieGenreTabsContainer";
import LogoContainer from "../components/LogoContainer";
import { useAdminMode } from "../contexts/AdminModeContext";

function Home() {
  const { movies } = useMovies();
  const { isAdminMode } = useAdminMode();
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  const handleAddCategory = () => {
    navigate("/AddSection");
  };

  const getCategories = () => {
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
    getCategories();
  }, []);

  return (
    <div className="home">
      <div className="movies-display-section">
        <LogoContainer />
        <DynamicHeroSlider movies={movies} />
        <MovieGenreTabsContainer categories={categories} />
        {isAdminMode && (
          <button
            className="add-category-container"
            type="button"
            onClick={handleAddCategory}
          >
            <img src="/src/assets/icons/add.svg" alt="add" />
          </button>
        )}
        {categories.map((categorie) => (
          <CategoryDisplay key={categorie.id} categorie={categorie} />
        ))}
      </div>
    </div>
  );
}

export default Home;

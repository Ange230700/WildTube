import { useState, useEffect } from "react";
import axios from "axios";
import { useMovies } from "../contexts/MovieContext";
import DynamicHeroSlider from "../components/DynamicHeroSlider";
import CategoryDisplay from "../components/CategoryDisplay";
import MovieGenreTabsContainer from "../components/MovieGenreTabsContainer";
import LogoContainer from "../components/LogoContainer";
import { useUser } from "../contexts/UserContext";

function Home() {
  const { movies } = useMovies();
  const [categories, setCategories] = useState([]);
  const { user } = useUser();
  const [showAd, setShowAd] = useState(false);

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

  useEffect(() => {
    setShowAd(true);
    const timer = setTimeout(() => {
      setShowAd(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home">
      <div className="movies-display-section">
        <LogoContainer />
        <DynamicHeroSlider movies={movies} />
        <button
          type="button"
          className={`pub ${showAd ? "show" : "hide"}`}
          onClick={() =>
            window.open("https://open.spotify.com/intl-fr", "_blank")
          }
        >
          {!user && <img src="/src/assets/icons/pub_spotify.jpg" alt="pub" />}
        </button>
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

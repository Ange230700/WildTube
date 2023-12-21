import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieSlide from "../components/MovieSlide";
import SerieSlide from "../components/SerieSlide";

function Categories() {
  const [searchValue, setSearchValue] = useState("");
  const [reqOneCount, setReqOneCount] = useState([]);
  const [reqTwoCount, setReqTwoCount] = useState([]);
  const [categories, setCategories] = useState([]);

  const { pathname } = useLocation();
  const catId = pathname.split("/")[2];

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  const fetchData = async () => {
    try {
      const result = await axios.all([
        axios.get(`http://localhost:3310/api/films/category/${catId}`),
        axios.get(`http://localhost:3310/api/series/category/${catId}`),
      ]);
      const resFilms = result[0].data;
      const resSeries = result[1].data;
      console.warn(resFilms, resSeries);
      setReqOneCount(resFilms);
      setReqTwoCount(resSeries);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [catId]);

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

  return (
    <div className="search">
      <div className="search-display-section">
        <div className="search-bar-container">
          <input
            className="search-bar"
            type="search"
            placeholder="Rechercher un film"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>
        {/* <div className="sort-container">
          <button type="button" className="sort-button">
            <p className="sort-text">Trier</p>
            <img
              className="sort-icon"
              src="/src/assets/icons/sort_icon.svg"
              alt="sort icon"
            />
          </button>
        </div> */}

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
        <div>
          <div className="display">
            {searchValue.length > 0 ? (
              <>
                {reqOneCount
                  .filter((movie) =>
                    movie.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  )
                  .map((movie) => (
                    <Link key={movie.id} to={`/movies/${movie.id}`}>
                      <MovieSlide movie={movie} />
                    </Link>
                  ))}
              </>
            ) : (
              <>
                {reqOneCount.map((film) => {
                  return (
                    <Link key={film.filmId} to={`/movies/${film.filmId}`}>
                      <MovieSlide movie={film} />
                    </Link>
                  );
                })}
                {reqTwoCount.map((serie) => {
                  return (
                    <Link key={serie.serieId} to={`/series/${serie.serieId}`}>
                      <SerieSlide serie={serie} />
                    </Link>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Categories;

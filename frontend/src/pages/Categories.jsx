import { useLocation } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import MovieLink from "../components/MovieLink";
import MovieGenreTabsContainer from "../components/MovieGenreTabsContainer";

function Categories() {
  const [searchValue, setSearchValue] = useState("");
  const [reqOneCount, setReqOneCount] = useState([]);
  const [categories, setCategories] = useState([]);

  const { pathname } = useLocation();
  const catId = pathname.split("/")[2];

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  const fetchData = async () => {
    try {
      const result = await axios.all([
        axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/films/category/${catId}`
        ),
      ]);
      const resFilms = result[0].data;
      setReqOneCount(resFilms);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [catId]);

  const getcategories = () => {
    axios

      .get(`${import.meta.env.VITE_BACKEND_URL}/api/categories`)

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
            placeholder="Search for a movie"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        <MovieGenreTabsContainer categories={categories} />
        <div className="display-container">
          <div
            className="display"
            style={
              pathname.includes("/category/")
                ? {
                    justifyContent: "center",
                  }
                : {}
            }
          >
            {searchValue.length > 0 ? (
              <>
                {reqOneCount
                  .filter((movie) =>
                    movie.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase())
                  )
                  .map((movie) => (
                    <MovieLink movie={movie} key={movie.id} />
                  ))}
              </>
            ) : (
              <>
                {reqOneCount.map((film) => {
                  return <MovieLink movie={film} key={film.id} />;
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

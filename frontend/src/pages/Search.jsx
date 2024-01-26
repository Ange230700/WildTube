import { useState } from "react";
import { useMovies } from "../contexts/MovieContext";
import MovieLink from "../components/MovieLink";

function Search() {
  const [searchValue, setSearchValue] = useState("");

  const { movies } = useMovies();

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  return (
    <div className="search">
      <div className="search-display-section">
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
        <div className="search-bar-container">
          <input
            className="search-bar"
            type="search"
            placeholder="Rechercher un film"
            value={searchValue}
            onChange={handleSearchChange}
          />
        </div>

        <div className="search-result-container">
          {searchValue.length > 0 ? (
            <>
              {movies
                .filter((movie) =>
                  movie.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((movie) => (
                  <MovieLink key={movie.id} movie={movie} />
                ))}
            </>
          ) : (
            <>
              {movies.map((movie) => (
                <MovieLink key={movie.id} movie={movie} />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;

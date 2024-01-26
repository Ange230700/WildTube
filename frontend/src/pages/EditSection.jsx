import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMovies } from "../contexts/MovieContext";
import MovieLink from "../components/MovieLink";
import { useUser } from "../contexts/UserContext";

function EditSection() {
  const [searchValue, setSearchValue] = useState("");
  const { sectionId } = useParams();
  const { movies } = useMovies();
  const { user } = useUser();

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  return (
    <div className="search">
      <div className="search-display-section">
        <div className="titleContainer">
          <h2 className="title">
            Modifier la section {`${parseInt(sectionId, 10)}`}
          </h2>
        </div>
        {user && user.IsAdmin && (
          <div className="sort-container">
            <input type="text" className="sort-button" />
          </div>
        )}
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

export default EditSection;

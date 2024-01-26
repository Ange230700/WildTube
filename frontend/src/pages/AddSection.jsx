import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useMovies } from "../contexts/MovieContext";
import MovieLink from "../components/MovieLink";
import { useUser } from "../contexts/UserContext";

function AddSection() {
  const [searchValue, setSearchValue] = useState("");
  const { movies } = useMovies();
  const { user } = useUser();
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const postCategory = async () => {
    try {
      const result = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/category`,
        {
          name: categoryName,
        }
      );
      if (result.status === 200) {
        toast.success("Category created");
        return result.insertId;
      }

      toast.error("Failed to create category");
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }

    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    postCategory();
  };

  return (
    <div className="search">
      <div className="search-display-section">
        <div className="titleContainer">
          <h2 className="title">Ajouter une section</h2>
        </div>
        {user && user.IsAdmin && (
          <form className="sort-container" onSubmit={handleSubmit}>
            <input
              type="text"
              value={categoryName}
              onChange={handleCategoryNameChange}
              placeholder="Enter category name"
              disabled={loading}
              className="sort-button"
            />
            <button type="submit" disabled={loading} className="sort-button">
              Create category
            </button>
          </form>
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

export default AddSection;

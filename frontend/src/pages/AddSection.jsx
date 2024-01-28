import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../contexts/MovieContext";
import MovieLink from "../components/MovieLink";
import { useUser } from "../contexts/UserContext";
import { useAdminMode } from "../contexts/AdminModeContext";

function AddSection() {
  const { isAdminMode, setIsAdminMode } = useAdminMode();
  const { movies } = useMovies();
  const { user } = useUser();
  const [searchValue, setSearchValue] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [selectedMovies, setSelectedMovies] = useState(new Set());
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  function fetchNumberOfCategories() {
    try {
      const result = axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/category/count`
      );
      console.warn("result", result.data);

      if (result.status === 200) {
        return result.data[0]["COUNT(*)"];
      }
    } catch (error) {
      console.error(error);
    }

    return null;
  }

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const addCategory = () => {
    if (categoryName) {
      const result = axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/category`,
        {
          name: categoryName,
        }
      );

      if (result.status === 200) {
        toast.success("Category created");
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const requests = [];

    try {
      addCategory();

      const categoryId = fetchNumberOfCategories() + 1;
      console.warn("categoryId", categoryId);

      const moviesToAdd = [...selectedMovies].map((movieId) =>
        movies.find((movie) => movie.id === movieId)
      );

      await Promise.all([
        ...moviesToAdd.map((movie) =>
          axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/films/${
              movie.id
            }/category/${categoryId}`,
            {
              filmId: movie.id,
              categorieId: categoryId,
              unique_key: `${movie.id}-${categoryId}`,
            }
          )
        ),
      ]);

      if (requests.every((response) => response.status === 200)) {
        toast.success("Category created");
        setIsAdminMode(!isAdminMode);
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    } finally {
      setIsSaving(false);
    }
  };

  const hasAllThatIsSelected =
    (categoryName && categoryName.length > 0) ||
    ![...selectedMovies].every((movieId) =>
      movies.find((m) => m.id === movieId)
    );

  useEffect(() => {
    fetchNumberOfCategories();
  }, []);

  return (
    <div className="search">
      <form className="search-display-section" onSubmit={handleSubmit}>
        <div className="search-bar-container">
          <input
            className="search-bar"
            type="search"
            placeholder="Rechercher un film"
            value={searchValue || ""}
            onChange={handleSearchChange}
          />
        </div>
        <div className="titleContainer">
          <h2 className="title">Ajouter une section</h2>
        </div>
        {user && user.IsAdmin && (
          <div className="sort-container">
            <input
              type="text"
              value={categoryName || ""}
              placeholder="Enter category name"
              className="sort-button"
              onChange={handleCategoryNameChange}
            />
          </div>
        )}

        <div className="search-result-container">
          {searchValue.length > 0 ? (
            <>
              {movies
                .filter((movie) =>
                  movie.title.toLowerCase().includes(searchValue.toLowerCase())
                )
                .map((movie) => (
                  <MovieLink
                    key={movie.id}
                    movie={movie}
                    selectedMovies={selectedMovies}
                    setSelectedMovies={setSelectedMovies}
                  />
                ))}
            </>
          ) : (
            <>
              {movies.map((movie) => (
                <MovieLink
                  key={movie.id}
                  movie={movie}
                  selectedMovies={selectedMovies}
                  setSelectedMovies={setSelectedMovies}
                />
              ))}
            </>
          )}
        </div>
        <button
          type="submit"
          disabled={!hasAllThatIsSelected || isSaving}
          className="sort-button"
        >
          Create category
        </button>
      </form>
    </div>
  );
}

export default AddSection;

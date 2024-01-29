import { useState } from "react";
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
  // const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  const handleCategoryNameChange = (e) => {
    setCategoryName(e.target.value);
  };

  const addCategory = async () => {
    if (categoryName) {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/category`,
          {
            name: categoryName,
          }
        );

        // if (result.status === 200) {
        // }
        console.warn("categoryName =>", categoryName);
        toast.success("Category created");
        return result.data.id;
      } catch (error) {
        console.error("Souci:", error);
        toast.error("Failed to add category");
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setIsSaving(true);

    try {
      const newCategoryId = await addCategory();
      console.warn("newCategoryId =>", newCategoryId);

      if (newCategoryId) {
        const movieAddPromises = Array.from(selectedMovies).map((movieId) =>
          axios.post(
            `${
              import.meta.env.VITE_BACKEND_URL
            }/api/film/${movieId}/category/${newCategoryId}`,
            {
              filmId: movieId,
              categorieId: newCategoryId,
              unique_key: `${movieId}-${newCategoryId}`,
            }
          )
        );

        await Promise.all(movieAddPromises);

        toast.success("Category created");
        setIsAdminMode(!isAdminMode);
        navigate("/");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Error creating category");
    }
  };

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
          <h2 className="title">Add a section</h2>
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
        <button type="submit" className="sort-button">
          Create category
        </button>
      </form>
    </div>
  );
}

export default AddSection;

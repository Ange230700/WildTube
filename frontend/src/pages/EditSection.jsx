import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMovies } from "../contexts/MovieContext";
import MovieLink from "../components/MovieLink";
import { useUser } from "../contexts/UserContext";

function EditSection() {
  const [searchValue, setSearchValue] = useState("");
  const { sectionId } = useParams();
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/category/${sectionId}`,
        {
          name: categoryName,
        }
      );

      if (result.status === 200) {
        toast.success("Category edited");
      }
    } catch (error) {
      console.error("Error creating category:", error);
      toast.error("Failed to create category");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="search">
      <div className="search-display-section">
        <div className="titleContainer">
          <h2 className="title">
            Modifier la section {`${parseInt(sectionId, 10)}`}
          </h2>
        </div>
        {user && user.IsAdmin && (
          <form className="sort-container" onSubmit={handleSubmit}>
            <input
              type="text"
              value={categoryName || ""}
              onChange={handleCategoryNameChange}
              placeholder="Enter category name"
              disabled={loading}
              className="sort-button"
            />
            <button type="submit" disabled={loading} className="sort-button">
              Edit category
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

export default EditSection;

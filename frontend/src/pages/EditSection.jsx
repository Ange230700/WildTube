import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useMovies } from "../contexts/MovieContext";
import MovieLink from "../components/MovieLink";
import { useUser } from "../contexts/UserContext";
import { useAdminMode } from "../contexts/AdminModeContext";

function EditSection() {
  const { isAdminMode, setIsAdminMode } = useAdminMode();
  const { sectionId } = useParams();
  const { movies } = useMovies();
  const { user } = useUser();
  const [searchValue, setSearchValue] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [originalCategoryName, setOriginalCategoryName] = useState("");
  const [selectedMovies, setSelectedMovies] = useState(new Set());
  const [originalSelectedMovies, setOriginalSelectedMovies] = useState(
    new Set()
  );
  const [isSaving, setIsSaving] = useState(false);
  const navigate = useNavigate();

  function fetchCategory() {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/category/${parseInt(
          sectionId,
          10
        )}`
      )
      .then((response) => {
        setCategoryName(response.data.name);
        setOriginalCategoryName(response.data.name);
      })
      .catch((error) => console.error(error));
  }

  function fetchMoviesInThisCategory() {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/films/category/${parseInt(
          sectionId,
          10
        )}`
      )
      .then((response) => {
        const movieIds = new Set(response.data.map((movie) => movie.id));
        setSelectedMovies(new Set(movieIds));
        setOriginalSelectedMovies(new Set(movieIds));
      })
      .catch((error) => console.error(error));
  }

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  function handleInputChange(event) {
    setCategoryName(event.target.value);
  }

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    const requests = [];

    try {
      if (categoryName !== originalCategoryName) {
        axios
          .put(
            `${import.meta.env.VITE_BACKEND_URL}/api/category/${parseInt(
              sectionId,
              10
            )}`,
            {
              name: categoryName,
            }
          )
          .then(() => {
            toast.success("Category name updated");
          })
          .catch((error) => {
            console.error(error);
            toast.error("An error occurred");
          });
      }

      // Find movies to add and remove
      const moviesToAdd = [...selectedMovies]
        .filter((movieId) => !originalSelectedMovies.has(movieId))
        .map((movieId) => movies.find((movie) => movie.id === movieId));

      const moviesToRemove = [...originalSelectedMovies]
        .filter((movieId) => !selectedMovies.has(movieId))
        .map((movieId) => movies.find((movie) => movie.id === movieId));

      // Add or remove movies in parallel
      await Promise.all([
        ...moviesToAdd.map((movie) =>
          axios.post(
            `${import.meta.env.VITE_BACKEND_URL}/api/film/${
              movie?.id
            }/category/${parseInt(sectionId, 10)}`,
            {
              filmId: movie?.id,
              categorieId: parseInt(sectionId, 10),
              unique_key: `${movie.id}-${parseInt(sectionId, 10)}`,
            }
          )
        ),
        ...moviesToRemove.map((movie) =>
          axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/film/${
              movie?.id
            }/category/${parseInt(sectionId, 10)}`
          )
        ),
      ]);

      // if all requests are successful, notify a success
      if (requests.every((response) => response.status === 200)) {
        toast.success("Changes saved");
        setIsAdminMode(!isAdminMode);
        navigate("/");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const hasChanges =
    categoryName !== originalCategoryName ||
    ![...selectedMovies].every((movie) => originalSelectedMovies.has(movie)) ||
    originalSelectedMovies.size !== selectedMovies.size;

  useEffect(() => {
    fetchCategory();
    fetchMoviesInThisCategory();
  }, [sectionId]);

  return (
    <div className="search">
      <form className="search-display-section" onSubmit={handleSave}>
        <div className="search-bar-container">
          <input
            className="search-bar"
            type="search"
            placeholder="Search for a movie"
            value={searchValue || ""}
            onChange={handleSearchChange}
          />
        </div>
        <div className="titleContainer">
          <h2 className="title">
            Editing the section '
            {(categoryName && categoryName) ||
              (originalCategoryName && originalCategoryName) ||
              ""}
            '
          </h2>
        </div>
        {user && user.IsAdmin && (
          <div className="sort-container">
            <input
              type="text"
              value={categoryName || ""}
              placeholder="Enter category name"
              className="sort-button"
              onChange={handleInputChange}
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
                    originalSelectedMovies={originalSelectedMovies}
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
                  originalSelectedMovies={originalSelectedMovies}
                />
              ))}
            </>
          )}
        </div>
        <button
          type="submit"
          className="sort-button"
          disabled={!hasChanges || isSaving}
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

export default EditSection;

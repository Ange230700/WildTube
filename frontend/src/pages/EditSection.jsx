import { useState, useEffect } from "react";
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
  const [selectedMovies, setSelectedMovies] = useState(new Set());
  const [categoryName, setCategoryName] = useState("");

  function fetchCategory() {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/category/${sectionId}`)
      .then((response) => {
        setCategoryName(response.data.name);
      })
      .catch((error) => console.error(error));
  }

  function fetchMoviesInThisCategory() {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/films/category/${sectionId}`
      )
      .then((response) => {
        const sectionMovies = response.data.map((movie) => movie.id);
        setSelectedMovies(new Set(sectionMovies));
      })
      .catch((error) => console.error(error));
  }

  function handleSearchChange(event) {
    setSearchValue(event.target.value);
  }

  function handleInputChange(event) {
    setCategoryName(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (categoryName) {
      axios
        .put(`${import.meta.env.VITE_BACKEND_URL}/api/category/${sectionId}`, {
          name: categoryName,
        })
        .then(() => {
          toast.success("Category name updated");
        })
        .catch((error) => {
          console.error(error);
          toast.error("An error occurred");
        });
    }

    const moviesToAdd = [];

    selectedMovies.forEach((selectedMovie) => {
      if (!moviesToAdd.includes(selectedMovie)) {
        moviesToAdd.push(selectedMovie);
      } else {
        moviesToAdd.splice(moviesToAdd.indexOf(selectedMovie), 1);
      }
    });

    const moviesToRemove = [];

    movies.forEach((movie) => {
      if (!selectedMovies.has(movie)) {
        moviesToRemove.push(movie);
      } else {
        moviesToRemove.splice(moviesToRemove.indexOf(movie), 1);
      }
    });

    // Send requests to backend to update the section
    const requests = [];

    moviesToAdd.forEach(() => {
      requests.push(
        axios
          .post(
            `${import.meta.env.VITE_BACKEND_URL}/api/film/category/${sectionId}`
          )
          .then(() => {
            toast.success("Movie added to category");
          })
          .catch((error) => {
            console.error(error);
            toast.error("An error occurred");
          })
      );
    });

    moviesToRemove.forEach((movie) => {
      requests.push(
        axios
          .delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/film/${
              movie.id
            }/category/${sectionId}`
          )
          .then(() => {
            toast.success("Movie removed from category");
          })
          .catch((error) => {
            console.error(error);
            toast.error("An error occurred");
          })
      );
    });

    await Promise.all(requests);
  };

  useEffect(() => {
    fetchCategory();
    fetchMoviesInThisCategory();
  }, [sectionId]);

  return (
    <div className="search">
      <form className="search-display-section" onSubmit={handleSubmit}>
        <div className="titleContainer">
          <h2 className="title">
            Modification de la section '{categoryName && categoryName}'
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
        <div className="search-bar-container">
          <input
            className="search-bar"
            type="search"
            placeholder="Rechercher un film"
            value={searchValue || ""}
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
                  <MovieLink
                    key={movie.id}
                    movie={movie}
                    sectionId={sectionId}
                    selectedMovies={Array.from(selectedMovies)}
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
                  sectionId={sectionId}
                  selectedMovies={Array.from(selectedMovies)}
                  setSelectedMovies={setSelectedMovies}
                />
              ))}
            </>
          )}
        </div>
        <button type="submit" className="sort-button">
          Edit category
        </button>
      </form>
    </div>
  );
}

export default EditSection;

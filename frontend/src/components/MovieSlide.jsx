import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useUser } from "../contexts/UserContext";
import { useAdminMode } from "../contexts/AdminModeContext";

function MovieSlide({ movie, categorie, fetchMoviesByCategorie }) {
  const { user } = useUser();
  const { isAdminMode } = useAdminMode();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isInCategory, setIsInCategory] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const fetchCategories = async () => {
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/categories`
      );

      if (result.status === 200) {
        return result.data.length;
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }

    return null;
  };

  const checkIfMovieInCategory = async () => {
    const insertedCategoryId = fetchCategories() + 1;
    try {
      const result = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/film/${
          movie.id
        }/category/${insertedCategoryId}`
      );

      if (result.status === 200) {
        setIsInCategory(true);
      } else {
        setIsInCategory(false);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMovieDeletion = async () => {
    setIsDeleting(true);

    try {
      const result = await axios.delete(
        `${import.meta.env.VITE_BACKEND_URL}/api/film/${movie.id}/category/${
          categorie.id
        }`
      );

      if (result.status === 200) {
        toast.success("Movie deleted");
        fetchMoviesByCategorie();
      } else {
        toast.error("An error occurred");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsDeleting(false);
      toast.error("An error occurred");
    }
  };

  const handleMovieCategoryChange = async () => {
    setIsLoading(true);

    try {
      const insertedCategoryId = fetchCategories() + 1;

      if (isInCategory) {
        const result = await axios.delete(
          `${import.meta.env.VITE_BACKEND_URL}/api/film/${
            movie.id
          }/category/${insertedCategoryId}`
        );

        if (result.status === 200) {
          toast.success("Movie deleted from category");
          fetchMoviesByCategorie();
        } else {
          toast.error("An error occurred");
        }
      } else {
        const result = await axios.post(
          `${import.meta.env.VITE_BACKEND_URL}/api/categoriesParFilm`,
          { filmId: movie.id, categorieId: insertedCategoryId }
        );

        if (result.status === 200) {
          toast.success("Movie added to category");
          fetchMoviesByCategorie();
        } else {
          toast.error("An error occurred");
        }
      }

      setIsInCategory(!isInCategory);
      fetchMoviesByCategorie();
      toast.success(
        `Movie ${isInCategory ? "added to" : "removed from"} category`
      );
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while changing the movie category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    if (!isLoading) {
      handleMovieCategoryChange();
    }
  };

  useEffect(() => {
    fetchCategories();
    checkIfMovieInCategory();
  }, [movie, categorie]);

  if (user && user.IsAdmin && isAdminMode) {
    return (
      !isDeleting && (
        <>
          <div
            className="movie-slide-requiring-registration"
            style={{
              filter: "blur(0px)",
            }}
          >
            <img
              src={
                (movie.miniature_filename &&
                  `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                    movie?.miniature_filename
                  }`) ||
                movie?.miniature_url
              }
              alt={movie.title}
              className="movie-slide blur-filter"
            />
          </div>
          <button
            className="locked-overlay"
            style={{
              backgroundColor: "#00000055",
              border: "none",
              outline: "none",
            }}
            type="button"
            onClick={handleMovieDeletion}
          >
            <div className="lock-icon-container">
              <img
                className="lock-icon"
                src="/src/assets/icons/remove2.svg"
                alt="lock icon"
              />
            </div>
          </button>
        </>
      )
    );
  }

  if (
    location.pathname.includes("/addSection") &&
    user &&
    user.IsAdmin &&
    isAdminMode
  ) {
    return (
      !isLoading && (
        <>
          <div
            className="movie-slide-requiring-registration"
            style={{
              filter: "blur(0px)",
            }}
          >
            <img
              src={
                (movie.miniature_filename &&
                  `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                    movie?.miniature_filename
                  }`) ||
                movie?.miniature_url
              }
              alt={movie.title}
              className="movie-slide blur-filter"
            />
          </div>
          <button
            className="locked-overlay"
            style={{
              backgroundColor: "#00000055",
              border: "none",
              outline: "none",
            }}
            type="button"
            onClick={handleClick}
          >
            <div className="lock-icon-container">
              <img
                className="lock-icon"
                src={`/src/assets/icons/${
                  isInCategory ? "remove2" : "add4"
                }.svg`}
                alt="lock icon"
              />
            </div>
          </button>
        </>
      )
    );
  }

  return movie.IsAvailable || user ? (
    <div>
      <img
        src={
          (movie.miniature_filename &&
            `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
              movie?.miniature_filename
            }`) ||
          movie?.miniature_url
        }
        alt={movie.title}
        className="movie-slide"
      />
    </div>
  ) : (
    <>
      <div className="movie-slide-requiring-registration">
        <img
          src={
            (movie.miniature_filename &&
              `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
                movie?.miniature_filename
              }`) ||
            movie?.miniature_url
          }
          alt={movie.title}
          className="movie-slide blur-filter"
        />
      </div>
      <div className="locked-overlay">
        <div className="lock-icon-container">
          <img
            className="lock-icon"
            src="/src/assets/icons/lock_icon.svg"
            alt="lock icon"
          />
        </div>
      </div>
    </>
  );
}

MovieSlide.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    miniature_filename: PropTypes.string,
    miniature_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string,
    duration: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    IsAvailable: PropTypes.number.isRequired,
  }).isRequired,
  categorie: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  fetchMoviesByCategorie: PropTypes.func,
};

MovieSlide.defaultProps = {
  categorie: null,
  fetchMoviesByCategorie: null,
};

export default MovieSlide;

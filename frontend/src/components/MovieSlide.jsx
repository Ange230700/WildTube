import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useUser } from "../contexts/UserContext";
import { useAdminMode } from "../contexts/AdminModeContext";

function MovieSlide({
  movie,
  categorie,
  fetchMoviesByCategorie,
  isMovieInCategory,
}) {
  const { user } = useUser();
  const { isAdminMode } = useAdminMode();
  const [isDeleting, setIsDeleting] = useState(false);
  const [inCategory, setInCategory] = useState(false);

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
      toast.error("An error occurred");
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    const checkCategory = async () => {
      const result = await isMovieInCategory(movie.id);
      setInCategory(result);
    };

    if (user && user.IsAdmin && isAdminMode) {
      checkCategory();
    }
  }, [movie, user, isAdminMode, isMovieInCategory]);

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
                src={
                  inCategory
                    ? "/src/assets/icons/add4.svg"
                    : "/src/assets/icons/remove2.svg"
                }
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
  }).isRequired,
  fetchMoviesByCategorie: PropTypes.func.isRequired,
  isMovieInCategory: PropTypes.func.isRequired,
};

export default MovieSlide;

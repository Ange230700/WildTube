import PropTypes from "prop-types";

function HeroMovieSlide({ movie }) {
  return (
    <img
      src={
        (movie.cover_filename &&
          `${import.meta.env.VITE_BACKEND_URL}/assets/images/${
            movie?.cover_filename
          }`) ||
        movie?.cover_url
      }
      alt={movie.title}
      className="hero-movie-slide"
    />
  );
}

HeroMovieSlide.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cover_filename: PropTypes.string,
    cover_url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string,
    duration: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    IsAvailable: PropTypes.number.isRequired,
  }).isRequired,
};

export default HeroMovieSlide;

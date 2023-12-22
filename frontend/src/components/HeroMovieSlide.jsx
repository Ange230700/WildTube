import PropTypes from "prop-types";

function HeroMovieSlide({ movie }) {
  return (
    <img src={movie.cover} alt={movie.title} className="hero-movie-slide" />
  );
}

HeroMovieSlide.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    cover: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    videoUrl: PropTypes.string,
    duration: PropTypes.number.isRequired,
    year: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    IsAvailable: PropTypes.number.isRequired,
  }).isRequired,
};

export default HeroMovieSlide;

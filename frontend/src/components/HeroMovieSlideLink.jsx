import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import HeroMovieSlide from "./HeroMovieSlide";

function HeroMovieSlideLink({ movie }) {
  return (
    <NavLink
      key={movie.id}
      to={`/movies/${movie.id}`}
      className="hero-movie-slide-link"
    >
      <HeroMovieSlide movie={movie} />
    </NavLink>
  );
}

HeroMovieSlideLink.propTypes = {
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

export default HeroMovieSlideLink;

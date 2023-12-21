/* eslint-disable import/no-extraneous-dependencies */
import { NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HeroMovieSlide from "./HeroMovieSlide";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1025 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 465 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

function DynamicHeroSlider({ movies }) {
  return (
    <Carousel
      className="dynamic-hero-slider-container"
      responsive={responsive}
      swipeable
      infinite
      autoPlay
      autoPlaySpeed={3000}
      transitionDuration={500}
      arrows={false}
    >
      {movies.map((movie) => {
        if (movie.IsAvailable) {
          return (
            <NavLink key={movie.id} to={`/movies/${movie.id}`}>
              <HeroMovieSlide movie={movie} />
            </NavLink>
          );
        }
        return null;
      })}
    </Carousel>
  );
}

DynamicHeroSlider.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cover: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      videoUrl: PropTypes.string,
      duration: PropTypes.number.isRequired,
      year: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      IsAvailable: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DynamicHeroSlider;

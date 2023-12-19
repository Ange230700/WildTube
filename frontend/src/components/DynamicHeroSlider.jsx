/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HeroMovieSlideLink from "./HeroMovieSlideLink";

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
          return <HeroMovieSlideLink key={movie.id} movie={movie} />;
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

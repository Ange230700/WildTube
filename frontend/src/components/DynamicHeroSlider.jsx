/* eslint-disable import/no-extraneous-dependencies */
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import HeroMovieSlideLink from "./HeroMovieSlideLink";

const responsive = {
  desktop: {
    breakpoint: { max: 1600, min: 1025 },
    items: 1,
    // partialVisibilityGutter: 0,
  },
  landscapeTablet: {
    breakpoint: { max: 1024, min: 835 },
    items: 1,
    // partialVisibilityGutter: 0,
  },
  tablet: {
    breakpoint: { max: 834, min: 769 },
    items: 1,
    // partialVisibilityGutter: 0,
  },
  landscapeMobile: {
    breakpoint: { max: 768, min: 481 },
    items: 1,
    // partialVisibilityGutter: 0,
  },
  mobile: {
    breakpoint: { max: 480, min: 320 },
    items: 1,
    // partialVisibilityGutter: 0,
  },
};

function DynamicHeroSlider({ movies }) {
  return (
    <Carousel
      additionalTransfrom={0}
      arrows
      autoPlay
      autoPlaySpeed={3000}
      containerClass="dynamic-hero-slider-container"
      draggable
      infinite
      itemClass="slider-item"
      keyBoardControl
      minimumTouchDrag={80}
      removeArrowOnDeviceType={["landscapeMobile", "mobile"]}
      responsive={responsive}
      sliderClass="inner-slider-container"
      slidesToSlide={1}
      swipeable
      transitionDuration={500}
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

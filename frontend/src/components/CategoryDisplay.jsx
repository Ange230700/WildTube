import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import axios from "axios";
import MovieLink from "./MovieLink";

const responsive = {
  desktop: {
    breakpoint: { max: 4000, min: 1025 },
    items: 4,
    // partialVisibilityGutter: 0,
  },
  landscapeTablet: {
    breakpoint: { max: 1024, min: 835 },
    items: 4,
    // partialVisibilityGutter: 0,
  },
  tablet: {
    breakpoint: {
      max: 834,
      min: 769,
    },
    items: 4,
    // partialVisibilityGutter: 30,
  },
  landscapeMobile: {
    breakpoint: { max: 768, min: 481 },
    items: 4,
    // partialVisibilityGutter: 40,
  },
  mobile: {
    breakpoint: {
      max: 480,
      min: 320,
    },
    items: 4,
    // partialVisibilityGutter: 40,
  },
};

function CategoryDisplay({ categorie }) {
  const [allMoviesForOneCategorie, setAllMoviesForOneCategorie] = useState([]);
  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/films/category/${categorie.id}`)
      .then((response) => {
        setAllMoviesForOneCategorie(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [categorie.id]);

  if (allMoviesForOneCategorie.length) {
    return (
      <section className="category-movie-display-container">
        <div className="category-title-container">
          <div className="category-title">{categorie.name}</div>
        </div>
        <Carousel
          additionalTransfrom={0}
          arrows
          autoPlaySpeed={3000}
          centerMode={false}
          className="static-slider-container"
          containerClass="container"
          dotListClass=""
          draggable
          focusOnSelect={false}
          infinite={false}
          itemClass=""
          keyBoardControl
          minimumTouchDrag={80}
          pauseOnHover
          removeArrowOnDeviceType={["landscapeMobile", "mobile"]}
          renderArrowsWhenDisabled={false}
          renderButtonGroupOutside={false}
          renderDotsOutside={false}
          responsive={responsive}
          rewind={false}
          rewindWithAnimation={false}
          rtl={false}
          shouldResetAutoplay
          showDots={false}
          sliderClass=""
          slidesToSlide={1}
          swipeable
        >
          {allMoviesForOneCategorie.map((movie) => (
            <MovieLink key={movie.id} movie={movie} />
          ))}
        </Carousel>
      </section>
    );
  }
  return null;
}

CategoryDisplay.propTypes = {
  categorie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryDisplay;

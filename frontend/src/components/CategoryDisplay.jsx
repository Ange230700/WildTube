import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Carousel from "react-multi-carousel";
import axios from "axios";
import MovieLink from "./MovieLink";
import { useAdminMode } from "../contexts/AdminModeContext";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1601 },
    items: 7,
  },
  desktop: {
    breakpoint: { max: 1600, min: 1025 },
    items: 6,
  },
  landscapeTablet: {
    breakpoint: { max: 1024, min: 835 },
    items: 5,
  },
  tablet: {
    breakpoint: {
      max: 834,
      min: 769,
    },
    items: 5,
  },
  landscapeMobile: {
    breakpoint: { max: 768, min: 481 },
    items: 4,
  },
  mobile: {
    breakpoint: {
      max: 480,
      min: 320,
    },
    items: 4,
  },
};

function CategoryDisplay({ categorie }) {
  const { isAdminMode } = useAdminMode();
  const [allMoviesForOneCategorie, setAllMoviesForOneCategorie] = useState([]);

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/films/category/${categorie.id}`
      )
      .then((response) => {
        setAllMoviesForOneCategorie(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [categorie.id]);

  return (
    allMoviesForOneCategorie.length && (
      <section className="category-movie-display-container">
        <div className="category-title-container">
          <h1
            className="category-title"
            style={
              isAdminMode
                ? {
                    fontSize: "2em",
                  }
                : {}
            }
          >
            {categorie.name}
          </h1>
          {isAdminMode && (
            <>
              <button className="add-movie-container" type="button">
                <img src="/src/assets/icons/edit.png" alt="edit button" />
              </button>
              <button className="add-movie-container" type="button">
                <img src="/src/assets/icons/remove.svg" alt="edit button" />
              </button>
            </>
          )}
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
          itemClass="static-slider-item"
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
          {allMoviesForOneCategorie.map((movie) => {
            return <MovieLink key={movie.id} movie={movie} />;
          })}
        </Carousel>
      </section>
    )
  );
}

CategoryDisplay.propTypes = {
  categorie: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default CategoryDisplay;

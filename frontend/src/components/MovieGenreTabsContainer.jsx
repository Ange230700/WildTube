/* eslint-disable import/no-extraneous-dependencies */
import useEmblaCarousel from "embla-carousel-react";
import PropTypes from "prop-types";
import MovieGenreTab from "./MovieGenreTab";

function MovieGenreTabsContainer({ categories }) {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
  });

  return (
    <div className="embla" ref={emblaRef}>
      <div className="embla__container">
        {categories.map((category) => (
          <MovieGenreTab key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}

MovieGenreTabsContainer.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MovieGenreTabsContainer;

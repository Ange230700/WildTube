import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MovieLink from "./MovieLink";

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
          {/* <div className="category-page-link">Show all</div> */}
        </div>
        <div className="static-slider-container">
          {allMoviesForOneCategorie.map((movie) => (
            <MovieLink key={movie.id} movie={movie} />
          ))}
        </div>
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

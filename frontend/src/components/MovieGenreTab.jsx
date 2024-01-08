import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MovieGenreTab({ category }) {
  const [allMoviesForOneCategory, setAllMoviesForOneCategory] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3310/api/films/category/${category.id}`)
      .then((response) => {
        setAllMoviesForOneCategory(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [category.id]);

  if (!allMoviesForOneCategory.length) return null;

  return (
    <li className="embla__slide">
      <Link
        className="movie-genre selected-tab"
        to={`/category/${category.id}`}
        state={category.id}
      >
        {category.name}
      </Link>
    </li>
  );
}

MovieGenreTab.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieGenreTab;

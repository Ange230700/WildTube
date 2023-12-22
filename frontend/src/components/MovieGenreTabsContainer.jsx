import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MovieGenreTabsContainer({ categories }) {
  return (
    <ul className="movie-genre-tabs-container">
      {categories.map((categorie) => {
        const [allMoviesForOneCategorie, setAllMoviesForOneCategorie] =
          useState([]);
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
            <li className="movie-genre-tab-container" key={categorie.id}>
              <Link
                className="movie-genre selected-tab"
                to={`/category/${categorie.id}`}
                state={categorie.id}
              >
                {categorie.name}
              </Link>
            </li>
          );
        }
        return null;
      })}
    </ul>
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

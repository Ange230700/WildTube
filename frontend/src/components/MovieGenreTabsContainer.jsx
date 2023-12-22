import { Link } from "react-router-dom";
import PropTypes from "prop-types";

function MovieGenreTabsContainer({ categories }) {
  return (
    <ul className="movie-genre-tabs-container">
      {categories.map((cat) => {
        return (
          <li className="movie-genre-tab-container" key={cat.id}>
            <Link
              className="movie-genre selected-tab"
              to={`/category/${cat.id}`}
              state={cat.id}
            >
              {cat.name}
            </Link>
          </li>
        );
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

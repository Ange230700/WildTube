import { createContext, useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/films")
      .then((response) => {
        setMovies(response.data);
        // console.info(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const value = useMemo(() => ({ movies, setMovies }), [movies, setMovies]);

  return (
    <MovieContext.Provider value={value}>{children}</MovieContext.Provider>
  );
}

export function useMovies() {
  const context = useContext(MovieContext);

  if (!context) {
    throw new Error(
      "useMovies must be used within a MovieProvider. Wrap a parent component in <MovieProvider> to fix this error."
    );
  }

  return context;
}

MovieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

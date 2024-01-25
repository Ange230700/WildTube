import { createContext, useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [movies, setMovies] = useState([]);

  const fetchMovies = () => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/films`)
      .then((response) => {
        setMovies(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const value = useMemo(
    () => ({ movies, setMovies, fetchMovies }),
    [movies, setMovies, fetchMovies]
  );

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

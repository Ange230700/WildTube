import { createContext, useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const SerieContext = createContext();

export function SerieProvider({ children }) {
  const [series, setSeries] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3310/api/series")
      .then((response) => {
        setSeries(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const value = useMemo(() => ({ series, setSeries }), [series, setSeries]);

  return (
    <SerieContext.Provider value={value}>{children}</SerieContext.Provider>
  );
}

export function useSeries() {
  const context = useContext(SerieContext);

  if (!context) {
    throw new Error(
      "useSeries must be used within a SerieProvider. Wrap a parent component in <SerieProvider> to fix this error."
    );
  }

  return context;
}

SerieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// import { useEffect, useState } from "react";
// import axios from "axios"; // eslint-disable-line

function Search() {
  return (
    <div className="search">
      <div className="search-display-section">
        <div className="search-bar-container">
          <input
            className="search-bar"
            type="search"
            placeholder="Rechercher un film"
          />
        </div>
        <div className="sort-container">
          <button type="button" className="sort-button">
            <p className="sort-text">Trier</p>
            <img
              className="sort-icon"
              src="/src/assets/icons/sort_icon.svg"
              alt="sort icon"
            />
          </button>
        </div>
        {/* <div className="search-result-container"></div> */}
      </div>
    </div>
  );
}

export default Search;

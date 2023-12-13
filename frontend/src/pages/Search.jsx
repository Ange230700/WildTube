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
      </div>
    </div>
  );
}

export default Search;

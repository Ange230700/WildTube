/* ************************************************************************* */
// Register Data Managers for Tables
/* ************************************************************************* */

// Import the manager modules responsible for handling data operations on the tables
const CategorieManager = require("./models/CategorieManager");
const UserManager = require("./models/UserManager");
const FilmManager = require("./models/FilmManager");
const SerieManager = require("./models/SerieManager");
const EnTendanceFilmManager = require("./models/EnTendanceFilmManager");
const FavoriFilmManager = require("./models/FavoriFilmManager");
const CategorieParFilmManager = require("./models/CategorieParFilmManager");
const CategorieParSerieManager = require("./models/CategorieParSerieManager");
const EnTendanceSerieManager = require("./models/EnTendanceSerieManager");

const managers = [
  CategorieManager,
  UserManager,
  FilmManager,
  SerieManager,
  EnTendanceFilmManager,
  EnTendanceSerieManager,
  FavoriFilmManager,
  CategorieParFilmManager,
  CategorieParSerieManager,
  // Add other managers here
];

// Create an empty object to hold data managers for different tables
const tables = {};

// Register each manager as data access point for its table
managers.forEach((ManagerClass) => {
  const manager = new ManagerClass();

  tables[manager.table] = manager;
});

console.info("Registered tables:", Object.keys(tables));

/* ************************************************************************* */

// Use a Proxy to customize error messages when trying to access a non-existing table

// Export the Proxy instance with custom error handling
module.exports = new Proxy(tables, {
  get(obj, prop) {
    // Check if the property (table) exists in the tables object
    if (prop in obj) return obj[prop];

    // If the property (table) does not exist, throw a ReferenceError with a custom error message
    throw new ReferenceError(
      `tables.${prop} is not defined. Did you register it in ${__filename}?`
    );
  },
});

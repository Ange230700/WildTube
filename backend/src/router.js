const express = require("express");

const router = express.Router();

const path = require("path"); // eslint-disable-line

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const categorieControllers = require("./controllers/categorieControllers");
const categorieParFilmControllers = require("./controllers/categorieParFilmControllers");
const filmControllers = require("./controllers/filmControllers");
const userControllers = require("./controllers/userControllers");
const favoriFilmControllers = require("./controllers/favoriFilmControllers");
const watchlistControllers = require("./controllers/watchlistControllers");
const authControllers = require("./controllers/authControllers");
const commentaireFilmControllers = require("./controllers/commentaireFilmControllers");

// Route to get a list of items
router.get("/films", filmControllers.browse);
router.get(
  "/films/category/:id",
  categorieParFilmControllers.browseFilmsForSpecificCategorie
);
router.get("/categories", categorieControllers.browse);
router.get("/users", userControllers.browse);
router.get(
  "/favorites/film/:userId",
  favoriFilmControllers.browseFavoriteMoviesByUserId
);
router.get(
  "/watchlist/film/:userId",
  watchlistControllers.browseWatchlistMoviesByUserId
);
router.get("/comments", commentaireFilmControllers.browse);
router.get(
  "/comments/film/:filmId",
  commentaireFilmControllers.browseCommentsByFilmId
);

// Route to get a specific item by ID

// Route to edit a specific item by ID
router.put("/users/:id", userControllers.edit);

// Route to add a new item
router.post("/login", authControllers.login);
router.post("/users", userControllers.add);
router.post("/favorites/film", favoriFilmControllers.addMovieToFavorite);
router.post("/watchlist/film", watchlistControllers.addMovieToWatchlist);
router.post("/comments", commentaireFilmControllers.addComment);

// Route to delete a specific item by ID
router.delete("/favorites/film/:userId/:filmId", favoriFilmControllers.destroy);
router.delete("/watchlist/film/:userId/:filmId", watchlistControllers.destroy);

module.exports = router;

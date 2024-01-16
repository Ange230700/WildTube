const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const { hashPassword } = require("./services/auth");

const userControllers = require("./controllers/userControllers");
const filmControllers = require("./controllers/filmControllers");
const categorieControllers = require("./controllers/categorieControllers");
const avatarControllers = require("./controllers/avatarControllers");
const watchlistControllers = require("./controllers/watchlistControllers");
const favoriFilmControllers = require("./controllers/favoriFilmControllers");
const categorieParFilmControllers = require("./controllers/categorieParFilmControllers");
const commentaireFilmControllers = require("./controllers/commentaireFilmControllers");

const authControllers = require("./controllers/authControllers");

// Route to get a list of items
router.get("/users", userControllers.browse);
router.get("/films", filmControllers.browse);
router.get("/categories", categorieControllers.browse);
router.get("/avatars", avatarControllers.browse);
router.get(
  "/watchlist/film/:userId",
  watchlistControllers.browseWatchlistMoviesByUserId
);
router.get(
  "/favorites/film/:userId",
  favoriFilmControllers.browseFavoriteMoviesByUserId
);
router.get(
  "/films/category/:id",
  categorieParFilmControllers.browseFilmsForSpecificCategorie
);
router.get("/comments", commentaireFilmControllers.browse);

// Route to get a specific item by ID
router.get("/avatar/:id", avatarControllers.read);
router.get("/user/:id", userControllers.read);
router.get(
  "/user/:userId/avatar/:avatarId",
  userControllers.readUserWithAvatar
);
router.get(
  "/comments/film/:filmId",
  commentaireFilmControllers.browseCommentsByFilmId
);

// Route to edit a specific item by ID
router.put("/user/:id", userControllers.edit);
router.put("/update-avatar/:userId", userControllers.updateAvatar);

// Route to add a new item
router.post("/login", authControllers.login);
router.post("/users", hashPassword, userControllers.add);
router.post("/favorites/film", favoriFilmControllers.addMovieToFavorite);
router.post("/watchlist/film", watchlistControllers.addMovieToWatchlist);
router.post("/comments", commentaireFilmControllers.addComment);

// Route to delete a specific item by ID
router.delete("/favorites/film/:userId/:filmId", favoriFilmControllers.destroy);
router.delete("/watchlist/film/:userId/:filmId", watchlistControllers.destroy);

module.exports = router;

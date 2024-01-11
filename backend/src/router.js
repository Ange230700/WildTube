const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const { hashPassword } = require("./services/auth");
const categorieControllers = require("./controllers/categorieControllers");
const categorieParFilmControllers = require("./controllers/categorieParFilmControllers");
const filmControllers = require("./controllers/filmControllers");
const userControllers = require("./controllers/userControllers");
const favoriFilmControllers = require("./controllers/favoriFilmControllers");
const watchlistControllers = require("./controllers/watchlistControllers");
const authControllers = require("./controllers/authControllers");
const commentaireParFilmControllers = require("./controllers/commentaireParFilmControllers");

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
router.get("/users/:id", userControllers.read);

// Route to get a specific item by ID
router.get("/commentaires/film/:id", commentaireParFilmControllers.read);
// Route to edit a specific item by ID

router.put("/users/:id", userControllers.edit);


router.put("/commentaire/film/:id", commentaireParFilmControllers.edit);

// Route to add a new item
router.post("/login", authControllers.login);
router.post("/users", hashPassword, userControllers.add);
router.post("/favorites/film", favoriFilmControllers.addMovieToFavorite);
router.post("/watchlist/film", watchlistControllers.addMovieToWatchlist);
router.post("/commentaire/film", commentaireParFilmControllers.add);

// Route to delete a specific item by ID
router.delete("/favorites/film/:userId/:filmId", favoriFilmControllers.destroy);
router.delete("/watchlist/film/:userId/:filmId", watchlistControllers.destroy);
router.delete("/commentaire/film/:id", commentaireParFilmControllers.destroy);

module.exports = router;

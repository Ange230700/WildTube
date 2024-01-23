const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations

const { uploadImages } = require("./multer/multer");
const { hashPassword } = require("./services/auth");
const categorieControllers = require("./controllers/categorieControllers");
const filmControllers = require("./controllers/filmControllers");
const userControllers = require("./controllers/userControllers");
const favoriFilmControllers = require("./controllers/favoriFilmControllers");
const watchlistControllers = require("./controllers/watchlistControllers");
const authControllers = require("./controllers/authControllers");
const categorieParFilmControllers = require("./controllers/categorieParFilmControllers");
const commentaireFilmControllers = require("./controllers/commentaireFilmControllers");

// Route to get a list of items
router.get("/films", filmControllers.browse);
// router.get("/films/:id", filmControllers.read);
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
router.get("/users/:id", userControllers.read);

// Route to edit a specific item by ID
router.put("/users/:id", userControllers.edit);

router.put("/comments/:commentId", commentaireFilmControllers.updateComment);

router.put("/films/:id", filmControllers.edit);

// Route to add a new item
router.post("/login", authControllers.login);
router.post("/users", hashPassword, userControllers.add);
router.post("/favorites/film", favoriFilmControllers.addMovieToFavorite);
router.post("/watchlist/film", watchlistControllers.addMovieToWatchlist);
router.put("/update-avatar/:userId", userControllers.updateAvatar);
router.post("/comments", commentaireFilmControllers.addComment);
router.post("/films", uploadImages.array("images", 2), filmControllers.add);

// Route to delete a specific item by ID
router.delete("/favorites/film/:userId/:filmId", favoriFilmControllers.destroy);
router.delete("/watchlist/film/:userId/:filmId", watchlistControllers.destroy);

router.delete("/comments/:commentId", commentaireFilmControllers.deleteComment);

router.delete("/films/:id", filmControllers.destroy);
router.delete("/categoriesParFilm/:id", categorieParFilmControllers.destroy);

module.exports = router;

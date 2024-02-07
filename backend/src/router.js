const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations

const { uploadImages, uploadImages2 } = require("./services/multer");
const { hashPassword, verifyToken } = require("./services/auth");

const userControllers = require("./controllers/userControllers");
const filmControllers = require("./controllers/filmControllers");
const categorieControllers = require("./controllers/categorieControllers");
const avatarControllers = require("./controllers/avatarControllers");
const watchlistControllers = require("./controllers/watchlistControllers");
const favoriFilmControllers = require("./controllers/favoriFilmControllers");
const categorieParFilmControllers = require("./controllers/categorieParFilmControllers");
const commentaireFilmControllers = require("./controllers/commentaireFilmControllers");

const authControllers = require("./controllers/authControllers");

// § It seems that, when trying to upload an image for editing a film, the image is not being uploaded. The image is being uploaded when adding a new film, but not when editing an existing film (see the edit method in filmControllers.js). This is likely due to the fact that the edit method in filmControllers.js is not using the uploadImages2 middleware. How to fix this? Should we use the uploadImages2 middleware in the edit method in filmControllers.js? If so, how to do it? If not, what is the correct way to fix this issue?

// Route to get a list of items
router.get("/users", userControllers.browse);
router.get("/films", filmControllers.browse);
router.get("/films/:id", filmControllers.read);
router.get("/categories/film/:id", filmControllers.getFilmByCategorie);
router.get("/categories", categorieControllers.browse);
router.get("/category/count", categorieControllers.count);
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
router.get("/userByToken", verifyToken, userControllers.getByToken);
router.get(
  "/user/:userId/avatar/:avatarId",
  userControllers.readUserWithAvatar
);
router.get(
  "/comments/film/:filmId",
  commentaireFilmControllers.browseCommentsByFilmId
);
router.get(
  "/film/:filmId/category/:categoryId",
  categorieParFilmControllers.readOneFilmFromOneCategory
);
router.get("/category/:id", categorieControllers.read);

// Route to edit a specific item by ID
router.put("/user/:id", userControllers.edit);
router.put("/comments/:commentId", commentaireFilmControllers.updateComment);
router.put(
  "/films/:id",
  uploadImages2.fields([
    { name: "miniature", maxCount: 1 },
    { name: "cover", maxCount: 1 },
  ]),
  filmControllers.edit
);
router.put("/category/:id", categorieControllers.edit);

// Route to add a new item
router.post("/login", authControllers.login);
router.post("/users", hashPassword, userControllers.add);
router.post("/favorites/film", favoriFilmControllers.addMovieToFavorite);
router.post("/watchlist/film", watchlistControllers.addMovieToWatchlist);
router.post("/comments", commentaireFilmControllers.addComment);
router.post("/films", uploadImages.array("images", 2), filmControllers.add);
router.post(
  "/film/:filmId/category/:categoryId",
  categorieParFilmControllers.addFilmToCategory
);
router.post(
  "/categoriesParFilm",
  categorieParFilmControllers.AddCategoriesToFilm
);
router.post("/category", categorieControllers.add);

// Route to delete a specific item by ID
router.delete("/favorites/film/:userId/:filmId", favoriFilmControllers.destroy);
router.delete("/watchlist/film/:userId/:filmId", watchlistControllers.destroy);
router.delete("/comments/:commentId", commentaireFilmControllers.deleteComment);
router.delete("/films/:id", filmControllers.destroy);
router.delete(
  "/categoriesParFilm/:unique_key",
  categorieParFilmControllers.destroy
);
router.delete(
  "/film/:filmId/category/:categorieId",
  categorieParFilmControllers.removeFilmFromCategory
);
router.delete("/category/:id", categorieControllers.removeCategory);

module.exports = router;

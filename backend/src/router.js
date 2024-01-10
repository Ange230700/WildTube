const express = require("express");

const router = express.Router();

const path = require("path"); // eslint-disable-line

const multer = require("multer"); // eslint-disable-line

const { v4: uuidv4 } = require("uuid"); // eslint-disable-line

const storage = multer.diskStorage({
  destination(req, file, cb) {
    console.warn("file :", file);
    console.warn("path :", path.join(__dirname, "/../public/"));
    cb(null, path.join(__dirname, "/../public/")); // Make sure this directory exists
  },
  filename(req, file, cb) {
    const fileExtension = file.originalname.split(".").pop().toLowerCase();
    const fileName = uuidv4();
    console.warn(
      "fileName and fileExtension :",
      `${fileName}.${fileExtension}`
    );
    req.body.avatar = `${fileName}.${fileExtension}`;
    cb(null, `${fileName}.${fileExtension}`);
  },
  limits: {
    fileSize: 1024 * 1024 * 5, // Max file size: 5MB
  },
});

const upload = multer({ storage });

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

// Route to get a specific item by ID

// Route to edit a specific item by ID
router.put("/users/:id", upload.single("avatar"), userControllers.edit);

// Route to add a new item
router.post("/login", authControllers.login);
router.post("/users", userControllers.add);
router.post("/favorites/film", favoriFilmControllers.addMovieToFavorite);
router.post("/watchlist/film", watchlistControllers.addMovieToWatchlist);

// Route to delete a specific item by ID
router.delete("/favorites/film/:userId/:filmId", favoriFilmControllers.destroy);
router.delete("/watchlist/film/:userId/:filmId", watchlistControllers.destroy);

module.exports = router;

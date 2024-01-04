const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const categorieControllers = require("./controllers/categorieControllers");
const categorieParSerieControllers = require("./controllers/categorieParSerieControllers");
const filmControllers = require("./controllers/filmControllers");
const userControllers = require("./controllers/userControllers");
const serieControllers = require("./controllers/serieControllers");
const enTendanceFilmControllers = require("./controllers/enTendanceFilmControllers");
const enTendanceSerieControllers = require("./controllers/enTendanceSerieControllers");
const favoriFilmControllers = require("./controllers/favoriFilmControllers");
const categorieParFilmControllers = require("./controllers/categorieParFilmControllers");
const favoriSerieControllers = require("./controllers/favoriSerieControllers");
const commentaireParFilmControllers = require("./controllers/commentaireParFilmControllers");
// const categorieParFilmControllers = require("./controllers/categorieParFilmControllers");

// Route to get a list of items
router.get("/categories", categorieControllers.browse);
router.get("/categoriesParSerie", categorieParSerieControllers.browse);
router.get("/categoriesParFilm", categorieParFilmControllers.browse);
router.get(
  "/categoriesParSerie",
  categorieParSerieControllers.browseSeriesForSpecificCategorie
);
router.get(
  "/categoriesParFilm",
  categorieParFilmControllers.browseFilmsForSpecificCategorie
);
router.get("/films", filmControllers.browse);
router.get("/series", serieControllers.browse);
router.get("/users", userControllers.browse);
router.get("/favorites/film", favoriFilmControllers.browse);
router.get("/favorites/serie", favoriSerieControllers.browse);
router.get("/FilmsEnTendance", enTendanceFilmControllers.browse);
router.get("/SeriesEnTendance", enTendanceSerieControllers.browse);
router.get("/favorites", favoriFilmControllers.browse);
/* router.get("/commentaires/film", commentaireParFilmControllers.browse); */
// Route to get a specific item by ID
router.get("/categories/:id", categorieControllers.read);
// router.get("/categoriesParSerie/:id", categorieParSerieControllers.read);
router.get("/films/:id", filmControllers.read);
router.get("/series/:id", serieControllers.read);
router.get("/users/:id", userControllers.read);
router.get("/favorites/film/:id", favoriFilmControllers.read);
router.get("/favorites/serie/:id", favoriSerieControllers.read);
router.get("/FilmsEnTendance/:id", enTendanceFilmControllers.read);
router.get("/SeriesEnTendance/:id", enTendanceSerieControllers.read);
router.get("/favorites/:id", favoriFilmControllers.read);
router.get("/commentaires/film/:id", commentaireParFilmControllers.read);
// Route to edit a specific item by ID
router.put("/categories/:id", categorieControllers.edit);
// router.put("/categoriesParSerie/:id", categorieParSerieControllers.edit);
// router.put("/categoriesParFilm/:id", categorieParFilmControllers.edit);
router.put("/films/:id", filmControllers.edit);
router.put("/series/:id", serieControllers.edit);
router.put("/users/:id", userControllers.edit);
router.put("/commentaires/film/:id", commentaireParFilmControllers.edit);

// Route to add a new item
router.post("/categories", categorieControllers.add);
router.post("/categoriesParSerie", categorieParSerieControllers.add);
router.post("/categoriesParFilm", categorieParFilmControllers.add);
router.post("/films", filmControllers.add);
router.post("/series", serieControllers.add);
router.post("/users", userControllers.add);
router.post("/favorites/film", favoriFilmControllers.add);
router.post("/favorites/serie", favoriSerieControllers.add);
router.post("/FilmsEnTendance", enTendanceFilmControllers.add);
router.post("/SeriesEnTendance", enTendanceSerieControllers.add);
router.post("/favorites", favoriFilmControllers.add);
router.post("/commentaire/film", commentaireParFilmControllers.add);

// Route to delete a specific item by ID
router.delete("/categories/:id", categorieControllers.destroy);
router.delete("/categoriesParSerie/:id", categorieParSerieControllers.destroy);
router.delete("/categoriesParFilm/:id", categorieParFilmControllers.destroy);
router.delete("/films/:id", filmControllers.destroy);
router.delete("/series/:id", serieControllers.destroy);
router.delete("/users/:id", userControllers.destroy);
router.delete("/favorites/film/:id", favoriFilmControllers.destroy);
router.delete("/favorites/serie/:id", favoriSerieControllers.destroy);
router.delete("/FilmsEnTendance/:id", enTendanceFilmControllers.destroy);
router.delete("/SeriesEnTendance/:id", enTendanceSerieControllers.destroy);
router.delete("/favorites/:id", favoriFilmControllers.destroy);
router.delete("/commentaires/film/:id", commentaireParFilmControllers.destroy);

module.exports = router;

const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const categorieControllers = require("./controllers/categorieControllers");
const filmControllers = require("./controllers/filmControllers");
const serieControllers = require("./controllers/serieControllers");
const categorieParFilmControllers = require("./controllers/categorieParFilmControllers");

// Route to get a list of items
router.get("/categories", categorieControllers.browse);
router.get("/films", filmControllers.browse);
router.get("/series", serieControllers.browse);
router.get("/categorieParFilm", categorieParFilmControllers.browse);

// Route to get a specific item by ID
router.get("/categories/:id", categorieControllers.read);
router.get("/films/:id", filmControllers.read);
router.get("/series/:id", serieControllers.read);
router.get("/categorieParFilm/:id", categorieParFilmControllers.read);

// Route to edit a specific item by ID
router.put("/categories/:id", categorieControllers.edit);
router.put("/films/:id", filmControllers.edit);
router.put("/series/:id", serieControllers.edit);

// Route to add a new item
router.post("/categories", categorieControllers.add);
router.post("/films", filmControllers.add);
router.post("/series", serieControllers.add);

// Route to delete a specific item by ID
router.delete("/categories/:id", categorieControllers.destroy);
router.delete("/films/:id", filmControllers.destroy);
router.delete("/series/:id", serieControllers.destroy);
/* ************************************************************************* */

module.exports = router;

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
router.get("/serie", serieControllers.browse);
router.get("/categorieParFilm", categorieParFilmControllers.browse);

// Route to get a specific item by ID
router.get("/categories/:id", categorieControllers.read);
router.get("/films/:id", filmControllers.read);
router.get("/serie/:id", serieControllers.read);
router.get("/categorieParFilm/:id", categorieParFilmControllers.read);

// Route to edit a specific item by ID
router.put("/categories/:id", categorieControllers.edit);
router.put("/films/:id", filmControllers.edit);

// Route to add a new item
router.post("/categories", categorieControllers.add);
router.post("/films", filmControllers.add);
router.post("/serie", serieControllers.add);

// Route to Update a new item
router.update("/categories", categorieControllers.edit);
router.update("/serie", serieControllers.edit);

// Route to Delete a new item
router.delete("/categories", categorieControllers.destroy);
router.delete("/serie", serieControllers.destroy);

// Route to delete a specific item by ID
router.delete("/categories/:id", categorieControllers.destroy);
router.delete("/films/:id", filmControllers.destroy);
/* ************************************************************************* */

module.exports = router;

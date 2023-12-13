const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const categorieControllers = require("./controllers/categorieControllers");
const filmControllers = require("./controllers/filmControllers");
const userControllers = require("./controllers/userControllers");
const serieControllers = require("./controllers/serieControllers");
const enTendanceFilmControllers = require("./controllers/enTendanceFilmControllers");

// Route to get a list of items
router.get("/categories", categorieControllers.browse);
router.get("/films", filmControllers.browse);
router.get("/series", serieControllers.browse);
router.get("/users", userControllers.browse);
router.get("/FilmsEnTendance", enTendanceFilmControllers.browse);

// Route to get a specific item by ID
router.get("/categories/:id", categorieControllers.read);
router.get("/films/:id", filmControllers.read);
router.get("/series/:id", serieControllers.read);
router.get("/users/:id", userControllers.read);
router.get("/FilmsEnTendance/:id", enTendanceFilmControllers.read);

// Route to edit a specific item by ID
router.put("/films/:id", filmControllers.edit);
router.put("/series/:id", serieControllers.edit);
router.put("/users/:id", userControllers.edit);
router.put("/FilmsEnTendance/:id", enTendanceFilmControllers.edit);

// Route to add a new item
router.post("/categories", categorieControllers.add);
router.post("/films", filmControllers.add);
router.post("/series", serieControllers.add);
router.post("/users", userControllers.add);
router.post("/FilmsEnTendance", enTendanceFilmControllers.add);

// Route to detele a specific item by ID
router.delete("/films/:id", filmControllers.destroy);
router.delete("/series/:id", serieControllers.destroy);
router.delete("/users/:id", userControllers.destroy);
router.delete("/FilmsEnTendance", enTendanceFilmControllers.destroy);
/* ************************************************************************* */

module.exports = router;

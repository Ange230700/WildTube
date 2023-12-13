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

// Route to get a list of items
router.get("/categories", categorieControllers.browse);
router.get("/films", filmControllers.browse);
router.get("/users", userControllers.browse);
router.get("/serie", serieControllers.browse);

// Route to get a specific item by ID
router.get("/categories/:id", categorieControllers.read);
router.get("/films/:id", filmControllers.read);
router.get("/users/:id", userControllers.read);
router.get("/serie/:id", serieControllers.read);

// Route to edit a specific item by ID
router.put("/films/:id", filmControllers.edit);
router.put("/serie/:id", serieControllers.edit);

// Route to add a new item
router.post("/categories", categorieControllers.add);
router.post("/films", filmControllers.add);
router.post("/users", userControllers.add);
router.post("/serie", serieControllers.add);

// Route to Update a new item

// Route to Delete a new item

// Route to detele a specific item by ID
router.delete("/films/:id", filmControllers.destroy);
router.delete("/serie/:id", serieControllers.destroy);
/* ************************************************************************* */

module.exports = router;

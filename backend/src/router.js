const express = require("express");

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
/* ************************************************************************* */

// Import itemControllers module for handling item-related operations
const categorieControllers = require("./controllers/categorieControllers");

// Route to get a list of items
router.get("/categories", categorieControllers.browse);

// Route to get a specific item by ID
router.get("/categories/:id", categorieControllers.read);

// Route to add a new item
router.post("/categories", categorieControllers.add);

/* ************************************************************************* */

module.exports = router;

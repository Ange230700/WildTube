// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const categories = await tables.Categorie.readAll();

    // Respond with the items in JSON format
    response.json(categories);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

const count = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const categories = await tables.Categorie.count();
    console.warn(categories);

    // Respond with the items in JSON format
    response.json(categories);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The R of BREAD - Read operation
const read = async (request, response, next) => {
  try {
    // Fetch a specific item from the database based on the provided ID
    const categorie = await tables.Categorie.read(request.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with the item in JSON format
    if (categorie == null) {
      response.sendStatus(404);
    } else {
      response.json(categorie);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The E of BREAD - Edit (Update) operation
const edit = async (request, response, next) => {
  try {
    // Fetch the item from the database
    const categorie = await tables.Categorie.read(request.params.id);

    // If the item doesn't exist, respond with a 404 error
    if (!categorie) {
      response.status(404).json({
        error: `Categorie with ID ${request.params.id} doesn't exist`,
      });
    }

    // Update the existing item
    await tables.Categorie.update(request.params.id, request.body);

    // Respond with the updated item
    response.json(await tables.Categorie.read(request.params.id));
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (req, res, next) => {
  try {
    const result = await tables.Categorie.create(req.body);

    if (result.insertId) {
      res.sendStatus(200);
    }
  } catch (err) {
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation

const removeCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    // Delete the item from the database
    const result = await tables.Categorie.deleteCategory({
      id,
    });

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (result.affectedRows) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  count,
  read,
  edit,
  add,
  removeCategory,
};

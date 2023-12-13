// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browse = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const categories = await tables.categorie.readAll();

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
    const categorie = await tables.categorie.read(request.params.id);

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
  // Extract the ID of the item to be updated from the request parameters
  const { id } = request.params;

  // Add the ID to the item data extracted from the request body
  request.body.id = id;

  try {
    // Update the item in the database
    const result = await tables.categorie.update(request.body);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (result) {
      response.json(result);
      response.sendStatus(204);
    } else {
      response.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The A of BREAD - Add (Create) operation
const add = async (request, response, next) => {
  // Extract the item data from the request body
  const categorie = request.body;

  try {
    // Insert the item into the database
    const insertId = await tables.categorie.create(categorie);

    // Respond with HTTP 201 (Created) and the ID of the newly inserted item
    response.status(201).json({ insertId });
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// The D of BREAD - Destroy (Delete) operation
const destroy = async (request, response, next) => {
  // Extract the ID of the item to be deleted from the request parameters
  const { id } = request.params.id;

  try {
    // Delete the item from the database
    const result = await tables.categorie.delete(id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 200 (OK)
    if (result.affectedRows) {
      response.sendStatus(200);
    } else {
      response.sendStatus(404);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Ready to export the controller functions
module.exports = {
  browse,
  read,
  edit,
  add,
  destroy,
};

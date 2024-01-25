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

// The R of BREAD - Read operation

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

// The D of BREAD - Destroy (Delete) operation

// Ready to export the controller functions
module.exports = {
  browse,
  edit,
};

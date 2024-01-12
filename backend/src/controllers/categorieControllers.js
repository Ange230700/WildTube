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

// The A of BREAD - Add (Create) operation

// The D of BREAD - Destroy (Delete) operation

// Ready to export the controller functions
module.exports = {
  browse,
};

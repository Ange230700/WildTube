// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation

const browseFilmsForSpecificCategorie = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const films =
      await tables.Categorie_par_film.readAllFilmsForSpecificCategorie(
        request.params.id
      );

    // Respond with the items in JSON format
    response.json(films);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The A of BREAD - Add operation

// The D of BREAD - Delete operation

// Ready to export the controller functions
module.exports = {
  browseFilmsForSpecificCategorie,
};

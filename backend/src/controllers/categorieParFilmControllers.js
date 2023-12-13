// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browseCategoriesForSpecificFilm = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const categories =
      await tables.categorieParFilm.readAllCategoriesForSpecificFilm(
        request.params.id
      );

    // Respond with the items in JSON format
    response.json(categories);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

const browseFilmsForSpecificCategorie = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const films =
      await tables.categorieParFilm.readAllFilmsForSpecificCategorie(
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
const add = async (request, response, next) => {
  const { filmId, categorieId } = request.body;

  try {
    // Insert the new item into the database
    const id = await tables.categorieParFilm.create({ filmId, categorieId });

    // Fetch the newly created item from the database
    const categorieParFilm = await tables.categorieParFilm.read(id);

    // Respond with the newly created item in JSON format
    response.json(categorieParFilm);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroy = async (request, response, next) => {
  try {
    // Delete the item from the database
    const result = await tables.categorieParFilm.delete(request.params.id);

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (result) {
      response.sendStatus(204);
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// Ready to export the controller functions
module.exports = {
  browseCategoriesForSpecificFilm,
  browseFilmsForSpecificCategorie,
  add,
  destroy,
};

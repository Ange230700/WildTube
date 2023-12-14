// Import access to database tables
const tables = require("../tables");

// The B of BREAD - Browse (Read All) operation
const browseCategoriesForSpecificSerie = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const categories =
      await tables.categorieParSerie.readAllCategoriesForSpecificSerie(
        request.params.id
      );

    // Respond with the items in JSON format
    response.json(categories);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

const browseSeriesForSpecificCategorie = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const films =
      await tables.categorieParSerie.readAllSeriesForSpecificCategorie(
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
  const { serieId, categorieId } = request.body;

  try {
    // Insert the new item into the database
    const id = await tables.categorieParSerie.create({ serieId, categorieId });

    // Fetch the newly created item from the database
    const categorieParSerie = await tables.categorieParSerie.read(id);

    // Respond with the newly created item in JSON format
    response.json(categorieParSerie);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroy = async (request, response, next) => {
  try {
    // Delete the item from the database
    const result = await tables.categorieParSerie.delete(request.params.id);

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
  browseCategoriesForSpecificSerie,
  browseSeriesForSpecificCategorie,
  add,
  destroy,
};

// Import access to database tables
const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const categorieParSerie = await tables.Categorie_par_serie.readAll();
    res.json(categorieParSerie);
  } catch (err) {
    next(err);
  }
};

// The B of BREAD - Browse (Read All) operation
const browseCategoriesForSpecificSerie = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const categories =
      await tables.Categorie_par_serie.readAllCategoriesForSpecificSerie(
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
    const series =
      await tables.Categorie_par_serie.readAllSeriesForSpecificCategorie(
        request.params.id
      );

    // Respond with the items in JSON format
    response.json(series);
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
    const result = await tables.Categorie_par_serie.create({
      serieId,
      categorieId,
    });

    if (result.affectedRows) {
      const categorieParSerie =
        await tables.Categorie_par_serie.readAllSeriesForSpecificCategorie(
          categorieId
        );
      response.status(200).json(categorieParSerie);
    } else {
      response
        .status(200)
        .json({ message: "no problem but element not created" });
    }

    // Fetch the newly created item from the database

    // Respond with the newly created item in JSON format
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroy = async (req, response, next) => {
  const { id: serieId } = req.params;
  const { categorieId } = req.body;
  try {
    // Delete the item from the database
    const result = await tables.Categorie_par_serie.delete({
      serieId,
      categorieId,
    });

    // If the item is not found, respond with HTTP 404 (Not Found)
    // Otherwise, respond with HTTP 204 (No Content)
    if (result.affectedRows) {
      response.sendStatus(200);
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
  browse,
  browseCategoriesForSpecificSerie,
  browseSeriesForSpecificCategorie,
  add,
  destroy,
};

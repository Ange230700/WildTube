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

const readOneFilmFromOneCategory = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const film = await tables.Categorie_par_film.readOneFilmFromOneCategory(
      request.params.filmId,
      request.params.categoryId
    );

    // Respond with the items in JSON format
    response.json(film);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

const AddCategoriesToFilm = async (req, res, next) => {
  const { filmId, categorieId } = req.body;
  const unique_key = `${categorieId}-${filmId}`;

  try {
    const result = await tables.Categorie_par_film.createCategorieForFilm(
      filmId,
      categorieId,
      unique_key
    );

    if (result.affectedRows) {
      res.sendStatus(201);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { unique_key } = req.params;
  try {
    // Delete the item from the database
    const result = await tables.Categorie_par_film.deleteCategorie(unique_key);

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

// The A of BREAD - Add operation

const addFilmToCategory = async (req, response, next) => {
  const { filmId, categorieId } = req.params;
  try {
    // Create a new item in the database
    const result = await tables.Categorie_par_film.createFilmInOneCategory({
      filmId,
      categorieId,
    });

    // Respond with the newly created item
    response.status(201).json(result);
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation

const removeFilmFromCategory = async (req, response, next) => {
  const { filmId, categorieId } = req.params;
  console.warn("filmId", filmId);
  console.warn("categoryId", categorieId);
  try {
    // Delete the item from the database
    const result = await tables.Categorie_par_film.delete({
      filmId,
      categorieId,
    });
    console.warn("result1", result);
    console.warn("result.affectedRows", result.affectedRows);

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
  browseFilmsForSpecificCategorie,
  readOneFilmFromOneCategory,
  addFilmToCategory,
  destroy,
  removeFilmFromCategory,
  AddCategoriesToFilm,
};

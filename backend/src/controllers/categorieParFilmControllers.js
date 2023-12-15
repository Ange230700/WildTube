// Import access to database tables
const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const categorieParFilm = await tables.Categorie_par_film.readAll();
    res.json(categorieParFilm);
  } catch (err) {
    next(err);
  }
};

// The B of BREAD - Browse (Read All) operation
const browseCategoriesForSpecificFilm = async (request, response, next) => {
  try {
    // Fetch all items from the database
    const categories =
      await tables.Categorie_par_film.readAllCategoriesForSpecificFilm(
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
const add = async (request, response, next) => {
  const { filmId, categorieId } = request.body;

  try {
    // Insert the new item into the database
    const result = await tables.Categorie_par_film.create({
      filmId,
      categorieId,
    });

    if (result.affectedRows) {
      const categorieParFilm =
        await tables.Categorie_par_film.readAllFilmsForSpecificCategorie(
          categorieId
        );

      // Fetch the newly created item from the database
      // const categorieParFilm = await tables.categorieParFilm.read(id);

      // Respond with the newly created item in JSON format
      response.status(200).json(categorieParFilm);
    } else {
      response
        .status(200)
        .json({ message: "no problem but element not created" });
    }
  } catch (error) {
    // Pass any errors to the error-handling middleware
    next(error);
  }
};

// The D of BREAD - Delete operation
const destroy = async (req, response, next) => {
  const { id: filmId } = req.params;
  const { categorieId } = req.body;
  try {
    // Delete the item from the database
    const result = await tables.Categorie_par_film.delete({
      filmId,
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
  browseCategoriesForSpecificFilm,
  browseFilmsForSpecificCategorie,
  add,
  destroy,
};

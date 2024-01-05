const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const favorites = await tables.Favori_film.readAll();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const favorite = await tables.Favori_film.read(req.params.id);
    if (favorite == null) {
      res.sendStatus(404);
    } else {
      res.json(favorite);
    }
  } catch (err) {
    next(err);
  }
};

const readAllFavoriteMovies = async (req, res, next) => {
  try {
    const favorite = await tables.Favori_film.readAllFavoriteMovies();
    if (favorite == null) {
      res.sendStatus(404);
    } else {
      res.json(favorite);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const favorite = req.body;
  const { id } = req.params;

  try {
    const [result] = await tables.Favori_film.update(id, favorite);
    if (result.affectedRows) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const { userId, filmId } = req.body;

  try {
    const insertId = await tables.Favori_film.create({ userId, filmId });
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { filmId, userId } = req.body;
  // console.log(req.body);

  try {
    const result = await tables.Favori_film.delete(userId, filmId);
    // console.log(result);
    if (result.affectedRows) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};
module.exports = {
  browse,
  read,
  readAllFavoriteMovies,
  edit,
  add,
  destroy,
};

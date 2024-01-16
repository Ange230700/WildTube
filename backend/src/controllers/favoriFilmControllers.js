/* eslint-disable camelcase */
const tables = require("../tables");

const browseFavoriteMoviesByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const favorites = await tables.Favori_film.readFavoriteMoviesByUserId(
      userId
    );

    if (favorites == null) {
      res.sendStatus(404);
    } else {
      res.json(favorites);
    }
  } catch (err) {
    next(err);
  }
};

const addMovieToFavorite = async (req, res, next) => {
  const { userId, filmId } = req.body;
  const unique_key = `${userId}-${filmId}`;

  try {
    const result = await tables.Favori_film.createMovieInFavorites(
      userId,
      filmId,
      unique_key
    );

    if (result.affectedRows) {
      res.sendStatus(200);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { userId, filmId } = req.params;

  try {
    const result = await tables.Favori_film.delete(userId, filmId);

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
  browseFavoriteMoviesByUserId,
  addMovieToFavorite,
  destroy,
};

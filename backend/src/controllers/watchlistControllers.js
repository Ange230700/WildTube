/* eslint-disable camelcase */
const tables = require("../tables");

const browseWatchlistMoviesByUserId = async (req, res, next) => {
  const { userId } = req.params;

  try {
    const watchlist = await tables.Watchlist.readWatchlistMoviesByUserId(
      userId
    );

    if (watchlist == null) {
      res.sendStatus(404);
    } else {
      res.json(watchlist);
    }
  } catch (err) {
    next(err);
  }
};

const addMovieToWatchlist = async (req, res, next) => {
  const { userId, filmId } = req.body;
  const unique_key = `${userId}-${filmId}`;

  try {
    const result = await tables.Watchlist.createMovieInWatchlist(
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
    const result = await tables.Watchlist.delete(userId, filmId);

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
  browseWatchlistMoviesByUserId,
  addMovieToWatchlist,
  destroy,
};

/* eslint-disable camelcase */
const tables = require("../tables");

const browseWatchlistMoviesByUserId = async (req, res, next) => {
  const { userId } = req.params;
  // console.warn(req.params);

  try {
    const watchlist = await tables.Watchlist.readWatchlistMoviesByUserId(
      userId
    );
    // console.warn(watchlist);

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
  const { userId, filmId, unique_key } = req.body;
  // console.warn(req.body);

  try {
    const result = await tables.Watchlist.createMovieInWatchlist(
      userId,
      filmId,
      unique_key
    );
    // console.warn(result);

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
  // console.warn("req.params", req.params);

  try {
    const result = await tables.Watchlist.delete(userId, filmId);
    // console.warn(result);

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

const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const favorites = await tables.favori_film.readAll();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  browse,
};

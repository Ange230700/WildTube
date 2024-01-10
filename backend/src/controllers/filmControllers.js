const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const films = await tables.Film.readAll();
    res.json(films);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
};

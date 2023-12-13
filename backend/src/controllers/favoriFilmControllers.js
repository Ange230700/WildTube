const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const favorites = await tables.favori_film.readAll();
    res.json(favorites);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const favorite = await tables.favori_film.read(req.params.id);
    if (favorite == null) {
      res.sendStatus(404);
    } else {
      res.json(favorite);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const favorite = req.body;

  try {
    const insertId = await tables.favori_film.create(favorite);
    res.status(200).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id: userId } = req.params;
  const { filmId } = req.body;

  try {
    const [result] = await tables.favori_film.delete(userId, filmId);
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
  add,
  destroy,
};

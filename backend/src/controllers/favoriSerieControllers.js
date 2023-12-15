const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const FavoriSeries = await tables.favori_serie.readAll();
    res.json(FavoriSeries);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const favoriSerie = await tables.favori_serie.read(req.params.id);
    if (favoriSerie == null) {
      res.sendStatus(404);
    } else {
      res.json(favoriSerie);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const favorite = req.body;

  try {
    const insertId = await tables.favori_serie.create(favorite);
    res.status(200).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id: userId } = req.params;
  const { serieId } = req.body;

  try {
    const [result] = await tables.favori_serie.delete(userId, serieId);
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

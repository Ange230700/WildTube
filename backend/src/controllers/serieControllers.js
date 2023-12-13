const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const series = await tables.serie.readAll();
    res.json(series);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const serie = await tables.serie.read(req.params.id);
    if (serie == null) {
      res.sendStatus(404);
    } else {
      res.json(serie);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { id } = req.params.id;
  req.body.id = id;
  try {
    const result = await tables.serie.update(req.body);
    if (result.affectedRows) {
      res.json(result);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const serie = req.body;

  try {
    const insertId = await tables.serie.create(serie);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params.id;
  try {
    const result = await tables.serie.delete(id);
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
  edit,
  add,
  destroy,
};

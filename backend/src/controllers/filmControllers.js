const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const films = await tables.Film.readAll();
    res.json(films);
  } catch (err) {
    next(err);
  }
};

const read = async (req, res, next) => {
  try {
    const film = await tables.Film.read(req.params.id);
    if (film == null) {
      res.sendStatus(404);
    } else {
      res.json(film);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  const { id } = req.params;
  req.body.id = id;
  try {
    const result = await tables.Film.update(req.body);
    if (result) {
      // res.json(result);
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (err) {
    next(err);
  }
};

const destroy = async (req, res, next) => {
  const { id } = req.params;
  try {
    const [result] = await tables.Film.delete(id);
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
  destroy,
  edit,
};

const tables = require("../tables");

// % How to retrieve the uploaded file from the request object in the edit method?

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

  console.warn("req.body.cover in edit", req.body.cover);

  if (req.files.cover && req.files.cover[0]) {
    req.body.cover_filename = req.files.cover[0].filename;
  }

  console.warn("req.body.miniature in edit", req.body.miniature);

  if (req.files.miniature && req.files.miniature[0]) {
    req.body.miniature_filename = req.files.miniature[0].filename;
  }

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

const add = async (req, res, next) => {
  console.warn("req.body.images in add", req.body.images);

  if (req.body.images.length === 2) {
    const miniature = req.body.images[0];
    const cover = req.body.images[1];
    req.body.miniature_filename = miniature;
    req.body.cover_filename = cover;
  } else {
    res.status(403).send({ message: "Missing file" });
  }

  const film = req.body;

  try {
    // 1. Ajouter le film
    const insertId = await tables.Film.create(film);

    // 2. Faire la connexion avec les catégories
    const categories = JSON.parse(req.body.category);
    const categoriesIds = categories.map((category) => {
      return category.id;
    });

    // Assurez-vous que l'ID du film est disponible
    if (insertId) {
      const response = await tables.Categorie_par_film.create({
        filmId: insertId,
        categoriesIds,
      });

      if (response) {
        res.status(200).json({ insertId });
      } else {
        res.status(500).send({ message: "Error inserting category" });
      }
    } else {
      res.status(500).send({ message: "Error inserting film" });
    }
  } catch (err) {
    next(err);
  }
};

const getFilmByCategorie = async (req, res, next) => {
  try {
    const film = await tables.Film.getFilmByCategorie(req.params.id);
    if (film == null) {
      res.sendStatus(404);
    } else {
      res.json(film);
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
  edit,
  add,
  getFilmByCategorie,
  destroy,
};

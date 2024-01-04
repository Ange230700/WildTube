const tables = require("../tables");

// Peut-etre a supprimer :
/* const browse = async (req, res, next) => {
  try {
    const commentaires = await tables.commentaire_film.readAll();
    res.json(commentaires);
  } catch (err) {
    next(err);
  }
}; */

const read = async (req, res, next) => {
  try {
    const commentaire = await tables.commentaire_film.read(req.params.id);
    if (commentaire == null) {
      res.sendStatus(404);
    } else {
      res.json(commentaire);
    }
  } catch (err) {
    next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const result = await tables.commentaire_film.update(req);
    if (result) {
      try {
        const newComment = await tables.commentaire_film.readOne(req.params.id);
        if (newComment) {
          res.json(newComment);
        }
        res.sendStatus(404);
      } catch (err) {
        next(err);
      }
    }
    res.sendStatus(404);
  } catch (err) {
    next(err);
  }
};

const add = async (req, res, next) => {
  const commentaire = req.body;

  try {
    const insertId = await tables.commentaire_film.create(commentaire);
    res.status(200).json({ insertId });
  } catch (err) {
    next(err);
  }
};

// const destroy = async (req, res, next) => {
//   const { id: filmId } = req.params;
//   const { content } = req.body;

//   try {
//     const [result] = await tables.commentaire_film.delete(filmId, content);
//     if (result.affectedRows) {
//       res.sendStatus(200);
//     } else {
//       res.sendStatus(404);
//     }
//   } catch (err) {
//     next(err);
//   }
// };

const destroy = async (req, res, next) => {
  const commentaireId = req.params.id;

  try {
    const deletedRows = await tables.commentaire_film.delete(commentaireId);

    if (deletedRows > 0) {
      res.status(200).json({ message: "Commentaire supprimé avec succès." });
    } else {
      res.status(404).json({ message: "Commentaire non trouvé." });
    }
  } catch (err) {
    console.error("Erreur lors de la suppression du commentaire :", err);
    next(err);
  }
};

module.exports = {
  // browse,
  read,
  edit,
  add,
  destroy,
};

const tables = require("../tables");

const browse = async (req, res, next) => {
  try {
    const comments = await tables.Commentaire_film.readAll();

    if (!comments) {
      res.status(400).json({ message: "Bad Request" });
    } else {
      res.json(comments);
    }
  } catch (err) {
    next(err);
  }
};

const browseCommentsByFilmId = async (req, res, next) => {
  try {
    const { filmId } = req.params;
    const comments = await tables.Commentaire_film.readAllCommentsByFilmId(
      filmId
    );

    if (!comments) {
      res.status(400).json({ message: "Bad Request" });
    } else {
      res.json(comments);
    }
  } catch (err) {
    next(err);
  }
};

const addComment = async (req, res, next) => {
  try {
    const { userId, filmId, avatarId, content } = req.body;

    if (!userId || !filmId || !avatarId) {
      res.status(400).json({ message: "Bad Request" });
      return;
    }

    const date = new Date().toISOString().split("T")[0];
    const unique_key = `${userId}-${filmId}-${avatarId}`;

    const newComment = await tables.Commentaire_film.create({
      userId,
      filmId,
      avatarId,
      content,
      date,
      unique_key,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    next(err);
  }
};

module.exports = {
  browse,
  browseCommentsByFilmId,
  addComment,
};

/* eslint-disable camelcase */

const tables = require("../tables");

const { v4: uuidv4 } = require("uuid"); // eslint-disable-line

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
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const unique_key = uuidv4();

    console.warn(date);
    console.warn(unique_key);

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
    next(err);
  }
};

module.exports = {
  browse,
  browseCommentsByFilmId,
  addComment,
};

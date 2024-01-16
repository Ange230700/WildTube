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
    const { userId, filmId, content } = req.body;
    const date = new Date().toISOString().slice(0, 19).replace("T", " ");
    const unique_key = uuidv4();

    console.warn(date);
    console.warn(unique_key);

    const newComment = await tables.Commentaire_film.create({
      userId,
      filmId,
      content,
      date,
      unique_key,
    });

    res.status(201).json(newComment);
  } catch (err) {
    next(err);
  }
};
const deleteComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;

    const deletedComment = await tables.Commentaire_film.delete(commentId);

    if (deletedComment.affectedRows === 0) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.json({ message: "Comment deleted successfully" });
    }
  } catch (err) {
    next(err);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;

    const updatedComment = await tables.Commentaire_film.update(commentId, {
      content,
    });

    if (!updatedComment) {
      res.status(404).json({ message: "Comment not found" });
    } else {
      res.json(updatedComment);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  browse,
  browseCommentsByFilmId,
  addComment,
  deleteComment,
  updateComment,
};

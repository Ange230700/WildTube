/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class CommentaireFilmManager extends AbstractManager {
  constructor() {
    super({ table: "Commentaire_film" });
  }

  async create({ userId, filmId, content, date, unique_key }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (userId, filmId, content, date, unique_key) VALUES (?, ?, ?, ?, ?)`,
      [userId, filmId, content, date, unique_key]
    );

    return { id: result.insertId, userId, filmId, content, date, unique_key };
  }

  async readAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);

    return result;
  }

  async readAllCommentsByFilmId(filmId) {
    const [result] = await this.database.query(
      `SELECT User.id AS userId, Film.id AS filmId,${this.table}.date AS date, ${this.table}.id AS id, User.avatar AS avatar,${this.table}.content AS content FROM ${this.table} JOIN User ON ${this.table}.userId = User.id JOIN Film ON ${this.table}.filmId = Film.id WHERE filmId = ?`,
      [filmId]
    );

    return result;
  }

  async delete(commentId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [commentId]
    );

    return result;
  }

  async update(commentId, { content }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET content = ? WHERE id = ?`,
      [content, commentId]
    );

    return result;
  }
}

module.exports = CommentaireFilmManager;

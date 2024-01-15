/* eslint-disable camelcase */

const AbstractManager = require("./AbstractManager");

class CommentaireFilmManager extends AbstractManager {
  constructor() {
    super({ table: "Commentaire_film" });
  }

  async create({ userId, filmId, avatarId, content, date, unique_key }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (userId, filmId, avatarId, content, date, unique_key) VALUES (?, ?, ?, ?, ?, ?)`,
      [userId, filmId, avatarId, content, date, unique_key]
    );

    return result;
  }

  async readAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);

    return result;
  }

  async readAllCommentsByFilmId(filmId) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.userId = User.id JOIN Avatar ON ${this.table}.avatarId = Avatar.id JOIN Film ON ${this.table}.filmId = Film.id WHERE filmId = ?`,
      [filmId]
    );

    return result;
  }
}

module.exports = CommentaireFilmManager;

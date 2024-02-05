const AbstractManager = require("./AbstractManager");

class CommentaireFilmManager extends AbstractManager {
  constructor() {
    super({ table: "Commentaire_film" });
  }

  async create({ userId, filmId, avatarId, content, date }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (userId, filmId, avatarId, content, date) VALUES (?, ?, ?, ?, ?)`,
      [userId, filmId, avatarId, content, date]
    );

    return result;
  }

  async readAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);

    return result;
  }

  async readAllCommentsByFilmId(filmId) {
    const [result] = await this.database.query(
      `SELECT ${this.table}.content as content, ${this.table}.date as date, ${this.table}.id as id, ${this.table}.userId as userId, ${this.table}.filmId as filmId,
      User.IsAdmin as IsAdmin, User.avatarId as avatarId, User.civility as civility,  User.name as name, User.email as email, User.naissance as naissance,
      Avatar.avatar_filename as avatar_filename,  Avatar.avatar_url as avatar_url
      FROM ${this.table} JOIN User ON ${this.table}.userId = User.id JOIN Avatar ON ${this.table}.avatarId = Avatar.id JOIN Film ON ${this.table}.filmId = Film.id WHERE filmId = ?`,
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

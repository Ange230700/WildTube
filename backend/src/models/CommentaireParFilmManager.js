const AbstractManager = require("./AbstractManager");

class CommentaireParFilmManager extends AbstractManager {
  constructor() {
    super({ table: "commentaire_film" });
  }

  async create({ userId, filmId, content }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (userId, filmId, content) values (?,?,?)`,
      [userId, filmId, content]
    );
    return result.insertId;
  }

  async readOne(id) {
    const [result] = await this.database.query(
      `SELECT cf.id, cf.content, cf.userId FROM ${this.table} cf WHERE id = ?`,
      [id]
    );
    return {
      Status: 200,
      Message: "votre commentaire a bien été modifié",
      Data: result,
    };
  }

  async read(id) {
    const [result] = await this.database.query(
      `select cf.id, cf.content, cf.userId
        from ${this.table} cf
        inner join user u on cf.userId = u.id
        inner join film f on cf.filmId = f.id
        where cf.filmId = ?`,
      [id]
    );
    return result;
  }

  async update(req) {
    const [result] = await this.database.query(
      `update ${this.table} SET content = ? WHERE id = ?`,
      [req.body.content, req.params.id]
    );
    return result;
  }

  async delete(commentaireId) {
    const [result] = await this.database.query(
      `DELETE FROM commentaire_film WHERE id = ?`,
      [commentaireId.id]
    );

    return result.affectedRows || 0;
  }
}
module.exports = CommentaireParFilmManager;

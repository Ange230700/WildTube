const AbstractManager = require("./AbstractManager");

class CommentaireParSerieManager extends AbstractManager {
  constructor() {
    super({ table: "commentaire_serie" });
  }

  async create({ userId, serieId, content }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (userId, serieId, content) values (?,?,?)`,
      [userId, serieId, content]
    );
    return result.insertId;
  }

  async readOne(id) {
    const [result] = await this.database.query(
      `SELECT cs.id, cs.content, cs.userId FROM ${this.table} cs WHERE id = ?`,
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
      `select cs.id, cs.content, cs.userId
        from ${this.table} cs
        inner join user u on cs.userId = u.id
        inner join serie s on cs.serieId = s.id
        where cs.serieId = ?`,
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
      `DELETE FROM commentaire_serie WHERE id = ?`,
      [commentaireId.id]
    );

    return result.affectedRows || 0;
  }
}
module.exports = CommentaireParSerieManager;

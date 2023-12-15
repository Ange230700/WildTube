/*eslint-disable*/
const AbstractManager = require("./AbstractManager");

class FavoriSerieManager extends AbstractManager {
  constructor() {
    super({ table: "favori_serie" });
  }

  async create({ userId, serieId }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (userId, serieId) values (?,?)`,
      [userId, serieId]
    );
    return result.insertId;
  }
  async read(id) {
    const [result] = await this.database.query(
      `select u.id, s.id, s.title
      from Favori_serie fs
      inner join user u on fs.userId = u.id
      inner join serie s on fs.serieId = s.id
       where fs.userId = ?`,
      [id]
    );
    return result;
  }
  async readAll() {
    const [result] = await this.database.query(`select * from ${this.table}`);
    return result;
  }

  async delete(userId, serieId) {
    const result = await this.database.query(
      `delete from ${this.table} where userId = ? and serieId = ?`,
      [userId, serieId]
    );
    return result;
  }
}

module.exports = FavoriSerieManager;

const AbstractManager = require("./AbstractManager");

class FavoriFilmManager extends AbstractManager {
  constructor() {
    super({ table: "favori_film" });
  }

  async create({ userId, filmId }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (userId, filmId) values (?,?)`,
      [userId, filmId]
    );
    return result.insertId;
  }

  async read(id) {
    const [result] = await this.database.query(
      `select u.id, f.id, f.title
      from ${this.table} ff
      inner join user u on ff.userId = u.id
      inner join film f on ff.filmId = f.id
       where ff.userId = ?`,
      [id]
    );
    return result;
  }

  async readAll() {
    const [result] = await this.database.query(`select * from ${this.table}`);
    return result;
  }

  async delete(userId, filmId) {
    const [result] = await this.database.query(
      `delete from ${this.table} where userId = ? and filmId = ?`,
      [userId, filmId]
    );
    return result;
  }
}
module.exports = FavoriFilmManager;

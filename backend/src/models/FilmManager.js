const AbstractManager = require("./AbstractManager");

class FilmManager extends AbstractManager {
  constructor() {
    super({ table: "film" });
  }

  async create({
    miniature,
    title,
    VideoUrl,
    duration,
    year,
    description,
    IsAvailable,
  }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (miniature, title, VideoUrl, duration, year, description, IsAvailable) values (?,?,?,?,?,?,?)`,
      [miniature, title, VideoUrl, duration, year, description, IsAvailable]
    );
    return result.insertId;
  }

  async read(id) {
    const [result] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return result[0];
  }

  async readAll() {
    const [result] = await this.database.query(`select * from ${this.table}`);
    return result;
  }

  async update({
    id,
    miniature,
    title,
    VideoUrl,
    duration,
    year,
    description,
    IsAvailable,
  }) {
    const [result] = await this.database.query(
      `update ${this.table} SET miniature=? title=? VideoUrl=? duration=? year=? description=? IsAvailable=? where id=?`,
      [miniature, title, VideoUrl, duration, year, description, IsAvailable, id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const [result] = await this.database.query(
      `delete * from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }
}
module.exports = FilmManager;

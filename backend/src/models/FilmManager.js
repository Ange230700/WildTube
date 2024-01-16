const AbstractManager = require("./AbstractManager");

class FilmManager extends AbstractManager {
  constructor() {
    super({ table: "film" });
  }

  async create({
    urlImage,
    cover,
    title,
    video,
    duration,
    year,
    description,
    isAvailable,
  }) {
    // const cover = "toto";

    const [result] = await this.database.query(
      `insert into ${this.table} (miniature, cover, title, videoUrl, duration, year, description, isAvailable) values (?,?,?,?,?,?,?,?)`,
      [urlImage, cover, title, video, duration, year, description, isAvailable]
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
    videoUrl,
    duration,
    year,
    description,
    IsAvailable,
  }) {
    const [result] = await this.database.query(
      `update ${this.table} SET miniature=?, title=?, videoUrl=?, duration=?, year=?, description=?, IsAvailable=? where id=?`,
      [miniature, title, videoUrl, duration, year, description, IsAvailable, id]
    );
    return result.affectedRows;
  }

  async delete(id) {
    const result = await this.database.query(
      `delete  from ${this.table} where id = ?`,
      [id]
    );
    return result;
  }
}
module.exports = FilmManager;

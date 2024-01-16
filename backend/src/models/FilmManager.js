const AbstractManager = require("./AbstractManager");

class FilmManager extends AbstractManager {
  constructor() {
    super({ table: "Film" });
  }

  async readAll() {
    const [result] = await this.database.query(`SELECT * FROM ${this.table}`);
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );
    return result[0];
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

/*eslint-disable*/

const AbstractManager = require("./AbstractManager");

class SerieManager extends AbstractManager {
  constructor() {
    super({ table: "serie" });
  }

  async create({
    miniature,
    title,
    videoUrl,
    duration,
    year,
    description,
    isAvailable,
    episodesNumber,
    seasonsNumber,
  }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (miniature, title, videoUrl, duration, year, description, isAvailable, episodesNumber, seasonsNumber) values (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        miniature,
        title,
        videoUrl,
        duration,
        year,
        description,
        isAvailable,
        episodesNumber,
        seasonsNumber,
      ]
    );
    return result;
  }

  async read(id) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );
    return result;
  }

  async readAll() {
    const [result] = await this.database.query(`select * from ${this.table} `);
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
    isAvailable,
    episodesNumber,
    seasonsNumber,
  }) {
    const [result] = await this.database.query(

      `UPDATE ${this.table} SET miniature=?, title=?, videoUrl=?, duration=?, year=?, description=?, isAvailable=?, episodesNumber=?, seasonsNumber=? WHERE id=?`,
      [
        miniature,
        title,
        videoUrl,
        duration,
        year,
        description,
        isAvailable,
        episodesNumber,
        seasonsNumber,
        id,
      ]
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

module.exports = SerieManager;

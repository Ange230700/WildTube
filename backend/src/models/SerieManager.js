/*eslint-disable*/

const AbstractManager = require("./AbstractManager");

class SerieManager extends AbstractManager {
  constructor() {
    super({ table: "Serie" });
  }

  async create({
    miniature,
    title,
    duration,
    year,
    description,
    IsVailable,
    EpisodesNumber,
    SeasonsNumber,
  }) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (miniature, title, duration, year, description, IsVailable, EpisodesNumber, SeasonsNumber) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        miniature,
        title,
        duration,
        year,
        description,
        IsVailable,
        EpisodesNumber,
        SeasonsNumber,
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
    duration,
    year,
    description,
    IsVailable,
    EpisodesNumber,
    SeasonsNumber,
  }) {
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET  miniature = ?, title = ?, duration = ?, year = ?, description = ?, IsVailable = ?, EpisodesNumber = ?, SeasonsNumber = ?, WHERE id = ?`
    );
    [
      id,
      miniature,
      title,
      duration,
      year,
      description,
      IsVailable,
      EpisodesNumber,
      SeasonsNumber,
    ];
    return result;
  }
  async delete(id) {
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?,`
    )[id];
    return result;
  }
}

module.exports = SerieManager;

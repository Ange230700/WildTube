const AbstractManager = require("./AbstractManager");

class FilmManager extends AbstractManager {
  constructor() {
    super({ table: "Film" });
  }

  async create({
    miniature_filename,
    cover_filename,
    title,
    videoUrl,
    duration,
    year,
    description,
    isAvailable,
  }) {
    const [result] = await this.database.query(
      `insert into ${this.table} (miniature_filename, cover_filename, title, videoUrl, duration, year, description, isAvailable) values (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        miniature_filename,
        cover_filename,
        title,
        videoUrl,
        duration,
        year,
        description,
        isAvailable,
      ]
    );
    return result.insertId;
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
    miniature_filename,
    cover_filename,
    title,
    videoUrl,
    duration,
    year,
    description,
    IsAvailable,
  }) {
    const [result] = await this.database.query(
      `update ${this.table} SET miniature_filename=?, cover_filename=?, title=?, videoUrl=?, duration=?, year=?, description=?, IsAvailable=? where id=?`,
      [
        miniature_filename,
        cover_filename,
        title,
        videoUrl,
        duration,
        year,
        description,
        IsAvailable,
        id,
      ]
    );

    return result.affectedRows;
  }

  async getFilmByCategorie(id) {
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table}
      INNER JOIN Categorie_par_film ON Film.id = Categorie_par_film.filmId
      INNER JOIN Categorie ON Categorie_par_film.categorieId = Categorie.id
      WHERE Film.id = ?`,
      [id]
    );
    return rows;
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

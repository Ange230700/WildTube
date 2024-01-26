const AbstractManager = require("./AbstractManager");

class CategorieParFilmManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "categorieParFilm" as configuration
    super({ table: "Categorie_par_film" });
  }

  // The C of CRUD - Create operation

  // The Rs of CRUD - Read operations

  // ? get all films for a specific categorie
  async readAllFilmsForSpecificCategorie(idCategorie) {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN Categorie ON Categorie.id = ${this.table}.categorieId JOIN Film ON Film.id = ${this.table}.filmId WHERE Categorie.id = ?`,
      [idCategorie]
    );
    // Return the array of categories
    return rows;
  }

  async delete({ id }) {
    // Execute the SQL DELETE query to remove an categorieParFilm by its ID
    const [result] = await this.database.query(
      `delete from ${this.table} where filmId = ?`,
      [id]
    );

    // Return the number of affected rows
    return result;
  }

  async createCategorieForFilm(filmId, categorieId) {
    const unique_key = `${filmId}-${categorieId}`;
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (filmId, categorieId, unique_key) VALUES (?, ?, ?)`,
      [filmId, categorieId, unique_key]
    );

    return result;
  }

  async deleteCategorie(unique_key) {
    // Execute the SQL DELETE query to remove an categorieParFilm by its ID
    const [result] = await this.database.query(
      `delete from ${this.table} where unique_key = ?`,
      [unique_key]
    );

    // Return the number of affected rows
    return result;
  }

  // The D of CRUD - Delete operation
}

// Ready to export the manager
module.exports = CategorieParFilmManager;

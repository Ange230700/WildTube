const AbstractManager = require("./AbstractManager");

class CategorieParFilmManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "categorieParFilm" as configuration
    super({ table: "Categorie_par_film" });
  }

  // The C of CRUD - Create operation
  async create({ filmId, categorieId }) {
    // Execute the SQL INSERT query to add a new categorieParFilm to the "categorieParFilm" table
    const [result] = await this.database.query(
      `insert into ${this.table} (filmId, categorieId) values (?, ?)`,
      [filmId, categorieId]
    );

    // Return the ID of the newly inserted categorieParFilm
    return result;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(
      `SELECT f.title, c.name FROM ${this.table} fc INNER JOIN categorie c ON c.id = fc.categorieId INNER JOIN film f ON f.id = fc.filmId `
    );
    // Return the array of categories
    return rows;
  }

  // The Rs of CRUD - Read operations
  // ? get all categories for a specific film
  async readAllCategoriesForSpecificFilm(idFilm) {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(
      `select categorie.name from categorie inner join ${this.table} on categorie.id = ${this.table}.categorieId where ${this.table}.filmId = ?`,
      [idFilm]
    );
    // Return the array of categories
    return rows;
  }

  // ? get all films for a specific categorie
  async readAllFilmsForSpecificCategorie(idCategorie) {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(
      `select f.title, c.name, f.miniature, f.isAvailable, f.id AS filmId from ${this.table} fc inner join categorie c on c.id = fc.categorieId INNER JOIN film f ON f.id = fc.filmId where c.id = ?`,
      [idCategorie]
    );
    // Return the array of categories
    return rows;
  }

  // The D of CRUD - Delete operation

  async delete({ filmId, categorieId }) {
    // Execute the SQL DELETE query to remove an categorieParFilm by its ID
    const [result] = await this.database.query(
      `delete from ${this.table} where filmId = ? and categorieId = ?`,
      [filmId, categorieId]
    );

    // Return the number of affected rows
    return result;
  }
}

// Ready to export the manager
module.exports = CategorieParFilmManager;

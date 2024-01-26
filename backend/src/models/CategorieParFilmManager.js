const AbstractManager = require("./AbstractManager");

class CategorieParFilmManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "categorieParFilm" as configuration
    super({ table: "categorie_par_film" });
  }

  // The C of CRUD - Create operation
  async create({ filmId, categoriesIds }) {
    // prepa querySQLString et array de dependances
    let querySQL = `insert into ${this.table} (filmId, categorieId, unique_key) values`;
    const arrDep = [];

    categoriesIds.forEach((catId, index) => {
      const unique_key = `${filmId}-${catId}`;
      if (index === 0) querySQL += " (?, ?, ?)";
      else querySQL += ", (?, ?, ?)";

      arrDep.push(filmId, catId, unique_key);
    });
    // console.log("querySQL =>", querySQL);
    // console.log("arrDep =>", arrDep);

    // Execute the SQL INSERT query to add a new categorieParFilm to the "categorieParFilm" table
    const result = await this.database.query(`${querySQL};`, arrDep);

    // Return the ID of the newly inserted categorieParFilm
    return result;
  }

  async createFilmInOneCategory({ filmId, categorieId }) {
    // Execute the SQL INSERT query to add a new categorieParFilm to the "categorieParFilm" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (filmId, categorieId) VALUES (?, ?)`,
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
      `SELECT * FROM ${this.table} JOIN Categorie ON Categorie.id = ${this.table}.categorieId JOIN Film ON Film.id = ${this.table}.filmId WHERE Categorie.id = ?`,
      [idCategorie]
    );
    // Return the array of categories
    return rows;
  }

  // ? get one film from one categorie

  async readOneFilmFromOneCategory(filmId, categorieId) {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN Categorie ON Categorie.id = ${this.table}.categorieId JOIN Film ON Film.id = ${this.table}.filmId WHERE Film.id = ? AND Categorie.id = ?`,
      [filmId, categorieId]
    );
    // Return the array of categories
    return rows;
  }

  // The D of CRUD - Delete operation

  async delete({ filmId, categorieId }) {
    // Execute the SQL DELETE query to delete the categorieParFilm from the "categorieParFilm" table
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE filmId = ? AND categorieId = ?`,
      [filmId, categorieId]
    );
    console.warn("result", result);

    // Return the number of rows deleted (should be 1)
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

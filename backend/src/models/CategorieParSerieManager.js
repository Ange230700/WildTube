const AbstractManager = require("./AbstractManager");

class CategorieParSerieManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "categorieParFilm" as configuration
    super({ table: "categorieParSerie" });
  }

  // The C of CRUD - Create operation
  async create({ serieId, categorieId }) {
    // Execute the SQL INSERT query to add a new categorieParFilm to the "categorieParFilm" table
    const [result] = await this.database.query(
      `insert into ${this.table} (serieId, categorieId) values (?, ?)`,
      [serieId, categorieId]
    );

    // Return the ID of the newly inserted categorieParFilm
    return result.insertId;
  }

  // The Rs of CRUD - Read operations
  // ? get all categories for a specific film
  async readAllCategoriesForSpecificSerie(idSerie) {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(
      `select categorie.name from categorie inner join ${this.table} on categorie.id = ${this.table}.categorieId where ${this.table}.serieId = ?`,
      [idSerie]
    );
    // Return the array of categories
    return rows;
  }

  // ? get all films for a specific categorie
  async readAllSeriesForSpecificCategorie(idCategorie) {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(
      `select serie.title from serie inner join ${this.table} on serie.id = ${this.table}.serieId where ${this.table}.categorieId = ?`,
      [idCategorie]
    );
    // Return the array of categories
    return rows;
  }

  // The D of CRUD - Delete operation

  async delete({ serieId, categorieId }) {
    // Execute the SQL DELETE query to remove an categorieParFilm by its ID
    const [result] = await this.database.query(
      `delete from ${this.table} where serieId = ? and categorieId = ?`,
      [serieId, categorieId]
    );

    // Return the number of affected rows
    return result.affectedRows;
  }
}

// Ready to export the manager
module.exports = CategorieParSerieManager;

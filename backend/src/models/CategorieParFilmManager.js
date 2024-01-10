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
      `SELECT Film.id, Film.miniature, Film.cover, Film.title, Film.videoUrl, Film.duration, Film.year, Film.description, Film.IsAvailable, Categorie.name FROM ${this.table} JOIN Categorie ON Categorie.id = ${this.table}.categorieId JOIN Film ON Film.id = ${this.table}.filmId WHERE Categorie.id = ?`,
      [idCategorie]
    );
    // Return the array of categories
    return rows;
  }

  // The D of CRUD - Delete operation
}

// Ready to export the manager
module.exports = CategorieParFilmManager;

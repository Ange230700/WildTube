const AbstractManager = require("./AbstractManager");

class CategorieManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "categorie" as configuration
    super({ table: "Categorie" });
  }

  // The C of CRUD - Create operation

  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of categories
    return rows;
  }

  // The U of CRUD - Update operation

  // The D of CRUD - Delete operation
}

module.exports = CategorieManager;

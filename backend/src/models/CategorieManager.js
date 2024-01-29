const AbstractManager = require("./AbstractManager");

class CategorieManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "categorie" as configuration
    super({ table: "Categorie" });
  }

  // The C of CRUD - Create operation
  async create({ name }) {
    // Execute the SQL INSERT query to add a new categorie to the "categorie" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name) VALUES (?)`,
      [name]
    );

    // Return the ID of the newly inserted categorie
    return result;
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of categories
    return rows;
  }

  async count() {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(
      `SELECT COUNT(*) FROM ${this.table}`
    );

    // Return the array of categories
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve the category with the given ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the category
    return rows[0];
  }

  // The U of CRUD - Update operation
  async update(id, { name }) {
    // Execute the SQL UPDATE query to update the category with the given ID
    const [rows] = await this.database.query(
      `UPDATE ${this.table} SET name = COALESCE(?, name) WHERE id = ?`,
      [name, id]
    );

    // Return the category
    return rows[0];
  }

  // The D of CRUD - Delete operation
  async deleteCategory({ id }) {
    // Execute the SQL DELETE query to delete the category with the given ID
    const [rows] = await this.database.query(
      `DELETE FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the category
    return rows;
  }
}

module.exports = CategorieManager;

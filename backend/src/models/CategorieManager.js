const AbstractManager = require("./AbstractManager");

class CategorieManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "categorie" as configuration
    super({ table: "categorie" });
  }

  // The C of CRUD - Create operation

  async create({ name, position }) {
    // Execute the SQL INSERT query to add a new categorie to the "categorie" table
    const [result] = await this.database.query(
      `insert into ${this.table} (name, position) values (?, ?)`,
      [name, position]
    );

    // Return the ID of the newly inserted categorie
    return result.insertId;
  }

  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific categorie by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the categorie
    return rows[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all categories from the "categorie" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of categories
    return rows;
  }

  // The U of CRUD - Update operation
  // ^ Implemented the update operation to modify an existing categorie

  async update({ id, name, position }) {
    // Execute the SQL UPDATE query to modify an existing categorie
    const [result] = await this.database.query(
      `update ${this.table} set name = ?, position = ? where id = ?`,
      [name, position, id]
    );

    // Return the number of affected rows
    return result.affectedRows;
  }

  // The D of CRUD - Delete operation
  // ^ Implemented the delete operation to remove an categorie by its ID

  async delete(id) {
    // Execute the SQL DELETE query to remove the categorie from the "categorie" table
    const [result] = await this.database.query(
      `delete from ${this.table} where id = ?`,
      [id]
    );

    // Return the number of affected rows
    return result;
  }
}

module.exports = CategorieManager;

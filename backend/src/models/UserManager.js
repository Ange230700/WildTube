const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "User" });
  }

  // The C of CRUD - Create operation
  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "user" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation

  // The D of CRUD - Delete operation

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE email = ?`,
      [email]
    );

    // Return the first row of the result, which represents the item
    return result[0];
  }
}

module.exports = UserManager;

const AbstractManager = require("./AbstractManager");

class AvatarManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "avatar" as configuration
    super({ table: "Avatar" });
  }

  // The C of CRUD - Create operation

  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all avatars from the "avatar" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of avatars
    return rows;
  }

  // The U of CRUD - Update operation

  // The D of CRUD - Delete operation
}

module.exports = AvatarManager;

const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "User" });
  }

  // The C of CRUD - Create operation
  async create({ name, email, naissance, civility, password }) {
    // Execute the SQL INSERT query to insert a new item into the "user" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, email, naissance, civility, password) VALUES (?, ?, ?, ?, ?)`,
      [name, email, naissance, civility, password]
    );

    // Get the ID of the newly inserted item
    const createdId = result.insertId;

    // Return the newly created item
    return { id: createdId, name, email, naissance, civility, password };
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "user" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation
  async update(id, { name, email, naissance, avatar }) {
    const avatarPath = avatar ? avatar.replace("public", "") : null;

    console.warn("Updating user with ID:", id); // Log the ID
    console.warn("Data to update:", { name, email, naissance, avatarPath }); // Log the data

    // Make sure id is not undefined and is a number
    if (id === undefined || Number.isNaN(id)) {
      throw new Error("Invalid user ID");
    }

    // Execute the SQL UPDATE query to update an existing item
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, email = ?, naissance = ?, avatar = ? WHERE id = ?`,
      [name, email, naissance, avatarPath, id]
    );

    console.warn("Result:", result); // Log the result

    // Return the updated item
    return result;
  }

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

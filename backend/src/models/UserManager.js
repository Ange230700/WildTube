const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "User" });
  }

  // The C of CRUD - Create operation
  async create({ name, email, naissance, civility, hashedPassword }) {
    // Execute the SQL INSERT query to insert a new item into the "user" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, email, naissance, civility, hashed_password) VALUES (?, ?, ?, ?, ?)`,
      [name, email, naissance, civility, hashedPassword]
    );

    // Get the ID of the newly inserted item
    const createdId = result.insertId;

    // Return the newly created item
    return { id: createdId, name, email, naissance, civility, hashedPassword };
  }

  // The Rs of CRUD - Read operations

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "user" table
    const [rows] = await this.database.query(`SELECT * FROM ${this.table}`);

    // Return the array of items
    return rows;
  }

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows;
  }

  // The U of CRUD - Update operation
  async update({ name, email, naissance, civility, IsAdmin, id }) {
    // Execute the SQL UPDATE query to update a item to the "user" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name=?, email=?, naissance=?, civility=?, IsAdmin=?  WHERE id=?`,
      [name, email, new Date(naissance), civility, IsAdmin, id]
    );

    // Return the ID of the newly inserted item
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

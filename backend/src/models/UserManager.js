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

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `select * from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "user" table
    const [rows] = await this.database.query(`select * from ${this.table}`);

    // Return the array of items
    return rows;
  }
  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async updateAvatar(id, avatar) {
    // Execute the SQL UPDATE query to update a item to the "user" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET avatar = ? WHERE id = ?`,
      [avatar, id]
    );

    // Return the ID of the newly inserted item
    return result;
  }

  // The U of CRUD - Update operation
  async update(id, { name, email, naissance, avatar }) {
    console.warn("Updating user with ID:", id); // Log the ID
    console.warn("Data to update:", { name, email, naissance, avatar }); // Log the data

    // Make sure id is not undefined and is a number
    if (id === undefined || Number.isNaN(id)) {
      throw new Error("Invalid user ID");
    }

    // Execute the SQL UPDATE query to update an existing item
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET name = ?, email = ?, naissance = ?, avatar = ? WHERE id = ?`,
      [name, email, naissance, avatar, id]
    );

    console.warn("Result:", result); // Log the result

    // Return the updated item
    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async delete(id) {
    const [rows] = await this.database.query(
      `DELETE from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows;
  }

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [result] = await this.database.query(
      `select * from ${this.table} where email = ?`,
      [email]
    );

    // Return the first row of the result, which represents the item
    return result[0];
  }
}

module.exports = UserManager;

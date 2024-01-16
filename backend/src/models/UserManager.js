const AbstractManager = require("./AbstractManager");

class UserManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "user" as configuration
    super({ table: "User" });
  }

  // The C of CRUD - Create operation
  async create({
    name,
    email,
    naissance,
    civility,
    hashed_password,
    avatarId,
  }) {
    // Execute the SQL INSERT query to insert a new item into the "user" table
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (name, email, naissance, civility, hashed_password, avatarId) VALUES (?, ?, ?, ?, ?, ?)`,
      [name, email, naissance, civility, hashed_password, avatarId]
    );

    // Get the ID of the newly inserted item
    const createdId = result.insertId;

    // Return the newly created item
    return {
      id: createdId,
      name,
      email,
      naissance,
      civility,
      hashed_password,
      avatarId,
    };
  }
  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `SELECT * FROM ${this.table} WHERE id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows;
  }

  async readUserWithAvatar(user_id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `SELECT User.id AS id, name, email, naissance, civility, hashed_password, IsAdmin, avatarId, avatar_url, avatar_filename FROM ${this.table} JOIN Avatar ON User.avatarId = Avatar.id WHERE id = ?`,
      [user_id]
    );

    // Return the first row of the result, which represents the item
    return rows;
  }

  async readByEmail(email) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [result] = await this.database.query(
      `SELECT User.id AS id, name, email, naissance, civility, hashed_password, IsAdmin, avatarId, avatar_url, avatar_filename FROM ${this.table} JOIN Avatar ON User.avatarId = Avatar.id WHERE email = ?`,
      [email]
    );

    // Return the first row of the result, which represents the item
    return result[0];
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "user" table
    const [rows] = await this.database.query(
      `SELECT id, name, email, naissance, civility, IsAdmin, avatarId FROM ${this.table}`
    );

    // Return the array of items
    return rows;
  }

  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async updateAvatar(id, avatarId) {
    // Execute the SQL UPDATE query to update a item to the "user" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET avatarId = ? WHERE id = ?`,
      [avatarId, id]
    );

    // Return the ID of the newly inserted item
    return result;
  }

  // The U of CRUD - Update operation
  async update(
    id,
    { name, email, naissance, civility, hashed_password, avatarId }
  ) {
    await this.database.query(
      `UPDATE ${this.table} SET 
          name = COALESCE(?, name), 
          email = COALESCE(?, email), 
          naissance = COALESCE(?, naissance), 
          civility = COALESCE(?, civility), 
          hashed_password = COALESCE(?, hashed_password), 
          avatarId = COALESCE(?, avatarId)
          WHERE ${this.table}.id = ?`,
      [name, email, naissance, civility, hashed_password, avatarId, id]
    );

    const updatedRows = await this.database.query(
      `SELECT * FROM ${this.table} WHERE ${this.table}.id = ?`,
      [id]
    );

    return updatedRows.length > 0 ? updatedRows[0] : null;
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
}

module.exports = UserManager;

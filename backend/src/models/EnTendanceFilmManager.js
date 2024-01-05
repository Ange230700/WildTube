const AbstractManager = require("./AbstractManager");

class EnTendanceFilmManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "En_Tendance_Film" as configuration
    super({ table: "en_tendance_film" });
  }

  // The C of CRUD - Create operation

  async create({ userId, filmId }) {
    // Execute the SQL INSERT query to add a new item to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (userId, filmId) values (?, ?)`,
      [userId, filmId]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }
  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `SELECT u.id, f.id, f.title
       FROM ${this.table} tf
       INNER JOIN user u on tf.userId = u.id
       INNER JOIN film f on tf.filmId = f.id
       where tf.userId = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows;
  }

  async readAll() {
    // Execute the SQL SELECT query to retrieve all items from the "user" table
    const [result] = await this.database.query(`select * from ${this.table}`);
    return result;
  }
  // The U of CRUD - Update operation
  // TODO: Implement the update operation to modify an existing item

  async update({ userId, filmId }) {
    // Execute the SQL UPDATE query to update a item to the "user" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET userId=?, filmId=? WHERE id=?`,
      [userId, filmId]
    );

    // Return the ID of the newly inserted item
    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async delete(userId, filmId) {
    const [result] = await this.database.query(
      `DELETE from ${this.table} WHERE userId = ? and filmId = ?`,
      [userId, filmId]
    );

    // Return the first row of the result, which represents the item
    return result;
  }
}

module.exports = EnTendanceFilmManager;

const AbstractManager = require("./AbstractManager");

class EnTendanceSerieManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "En_Tendance_Film" as configuration
    super({ table: "en_tendance_serie" });
  }

  // The C of CRUD - Create operation

  async create({ userId, serieId }) {
    // Execute the SQL INSERT query to add a new item to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (userId, serieId) values (?, ?)`,
      [userId, serieId]
    );

    // Return the ID of the newly inserted item
    return result.insertId;
  }
  // The Rs of CRUD - Read operations

  async read(id) {
    // Execute the SQL SELECT query to retrieve a specific item by its ID
    const [rows] = await this.database.query(
      `SELECT u.id, s.id, s.title
       FROM ${this.table} ts
       INNER JOIN user u on ts.userId = u.id
       INNER JOIN serie s on ts.serieId = s.id
       where ts.userId = ?`,
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

  async update({ userId, serieId }) {
    // Execute the SQL UPDATE query to update a item to the "user" table
    const [result] = await this.database.query(
      `UPDATE ${this.table} SET userId=?, serieId=? WHERE id=?`,
      [userId, serieId]
    );

    // Return the ID of the newly inserted item
    return result;
  }

  // The D of CRUD - Delete operation
  // TODO: Implement the delete operation to remove an item by its ID

  async delete(userId, serieId) {
    const [result] = await this.database.query(
      `DELETE from ${this.table} WHERE userId = ? and serieId = ?`,
      [userId, serieId]
    );

    // Return the first row of the result, which represents the item
    return result;
  }
}

module.exports = EnTendanceSerieManager;

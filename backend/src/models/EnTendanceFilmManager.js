const AbstractManager = require("./AbstractManager");

class EnTendanceFilmManager extends AbstractManager {
  constructor() {
    // Call the constructor of the parent class (AbstractManager)
    // and pass the table name "En_Tendance_Film" as configuration
    super({ table: "En_Tendance_Film" });
  }

  // The C of CRUD - Create operation

  async create({ userId, filmId }) {
    // Execute the SQL INSERT query to add a new item to the "user" table
    const [result] = await this.database.query(
      `insert into ${this.table} (userId, filmId) values (?, ?)`,
      [userId, filmId]
    );

    // Return the ID of the newly inserted item
    return result;
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
    const [rows] = await this.database.query(`select userId, filmId, Film.title
    FROM En_Tendance_film 
    INNER JOIN User 
    INNER JOIN Film 
    WHERE`);

    // Return the array of items
    return rows;
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

  async delete(id) {
    const [rows] = await this.database.query(
      `DELETE from ${this.table} where id = ?`,
      [id]
    );

    // Return the first row of the result, which represents the item
    return rows;
  }
}

module.exports = EnTendanceFilmManager;

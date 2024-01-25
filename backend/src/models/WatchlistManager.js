/* eslint-disable camelcase */
const AbstractManager = require("./AbstractManager");

class WatchlistManager extends AbstractManager {
  constructor() {
    super({ table: "Watchlist" });
  }

  async createMovieInWatchlist(userId, filmId, unique_key) {
    const [result] = await this.database.query(
      `INSERT INTO ${this.table} (userId, filmId, unique_key) VALUES (?, ?, ?)`,
      [userId, filmId, unique_key]
    );
    return result;
  }

  async readWatchlistMoviesByUserId(userId) {
    const [result] = await this.database.query(
      `SELECT * FROM ${this.table} JOIN User ON ${this.table}.userId = User.id JOIN Film ON ${this.table}.filmId = Film.id WHERE userId = ?`,
      [userId]
    );
    return result;
  }

  async delete(userId, filmId) {
    const [result] = await this.database.query(
      `DELETE FROM ${this.table} WHERE userId = ? AND filmId = ?`,
      [userId, filmId]
    );
    return result;
  }
}

module.exports = WatchlistManager;

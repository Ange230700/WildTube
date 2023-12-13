const AbstractManager = require("./AbstractManager");

class FavoriFilmManager extends AbstractManager {
  constructor() {
    super({ table: "favori_film" });
  }
}
module.exports = FavoriFilmManager;

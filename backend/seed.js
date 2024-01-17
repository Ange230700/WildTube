// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");
const argon2 = require("argon2");

// Import database client
const database = require("./database/client");

const avatars = require("./src/services/avatars");
const films = require("./src/services/films");
const categories = require("./src/services/categories");
const users = require("./src/services/users");

async function insertAvatars() {
  try {
    const queries = [];
    for (let i = 0; i < avatars.length; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO `Avatar` (`avatar_url`, `avatar_filename`) VALUES (?, ?)",
          [avatars[i].avatar_url, avatars[i].avatar_filename]
        )
      );
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting avatars:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

async function insertFilms() {
  // Similar to insertUsers, but for the Film table
  try {
    const queries = [];
    for (let i = 0; i < films.length; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO `Film` (`miniature`, `cover`, `title`, `videoUrl`, `duration`, `year`, `description`, `IsAvailable`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            films[i].miniature,
            films[i].cover,
            films[i].title,
            films[i].videoUrl,
            films[i].duration,
            films[i].year,
            films[i].description,
            films[i].IsAvailable,
          ]
        )
      );
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting films:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

async function insertCategories() {
  // Similar to insertUsers, but for the Categorie table
  try {
    const queries = [];
    for (let i = 0; i < categories.length; i += 1) {
      queries.push(
        database.query("INSERT INTO `Categorie` (`name`) VALUES (?)", [
          categories[i].name,
        ])
      );
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting categories:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

async function insertAdmin() {
  try {
    const password = "admin";
    const hashedPassword = argon2.hash(password); // Hash the password

    hashedPassword.then((hashed) => {
      return database.query(
        "INSERT INTO `User` (`name`, `email`, `naissance`, `civility`, `hashed_password`, `IsAdmin`, `avatarId`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Admin",
          "admin@admin.admin",
          "2000-01-01",
          1,
          hashed,
          1,
          faker.number.int({ min: 1, max: avatars.length }),
        ]
      );
    });
  } catch (err) {
    console.error("Error inserting admin:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

async function insertUsers() {
  try {
    const queries = [];
    for (let i = 0; i < users.length; i += 1) {
      const { password } = users[i];
      const hashedPassword = argon2.hash(password); // Hash the password

      queries.push(
        hashedPassword.then((hashed) => {
          return database.query(
            "INSERT INTO `User` (`name`, `email`, `naissance`, `civility`, `hashed_password`, `IsAdmin`, `avatarId`) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              users[i].name,
              users[i].email,
              users[i].naissance,
              users[i].civility,
              hashed,
              0,
              faker.number.int({ min: 1, max: avatars.length }),
            ]
          );
        })
      );
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting users:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

// Join tables

async function insertFilmCategorie() {
  try {
    const [filmsCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `Film`"
    );
    const [categoriesCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `Categorie`"
    );
    const uniqueKeysCombinations = new Set();
    const queries = [];
    const totalOfUniqueKeysCombinations = categories.length * films.length;

    if (categoriesCountRow[0].count && filmsCountRow[0].count) {
      while (
        uniqueKeysCombinations.size <
        faker.number.int({
          min: Math.floor(totalOfUniqueKeysCombinations / 4),
          max: Math.floor(totalOfUniqueKeysCombinations / 2),
        })
      ) {
        const filmId = faker.number.int({ min: 1, max: films.length });
        const categorieId = faker.number.int({
          min: 1,
          max: categories.length,
        });
        const unique_key = `${filmId}-${categorieId}`;

        if (!uniqueKeysCombinations.has(unique_key)) {
          uniqueKeysCombinations.add(unique_key);
          queries.push(
            database.query(
              "INSERT INTO `Categorie_par_film` (`filmId`, `categorieId`, `unique_key`) VALUES (?, ?, ?)",
              [filmId, categorieId, unique_key]
            )
          );
        }
      }

      await Promise.all(queries);
    } else {
      throw new Error(
        "Not enough data in Film or Categorie tables for seeding Categorie_par_film"
      );
    }
  } catch (err) {
    console.error("Error inserting film_categorie:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

async function insertCommentaires() {
  try {
    const [filmsCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `Film`"
    );
    const [usersCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `User`"
    );
    const [avatarsCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `Avatar`"
    );
    const uniqueKeysCombinations = new Set();
    const queries = [];
    const totalOfUniqueKeysCombinations =
      users.length * films.length * avatars.length;

    if (
      usersCountRow[0].count &&
      filmsCountRow[0].count &&
      avatarsCountRow[0].count
    ) {
      while (
        uniqueKeysCombinations.size <
        faker.number.int({
          min: 0,
          max: Math.floor(totalOfUniqueKeysCombinations / 4),
        })
      ) {
        const userId = faker.number.int({ min: 1, max: users.length });
        const filmId = faker.number.int({ min: 1, max: films.length });
        const avatarId = faker.number.int({ min: 1, max: avatars.length });

        queries.push(
          database.query(
            "INSERT INTO `Commentaire_film` (`userId`, `filmId`, `avatarId`, `content`, `date`, `unique_key`) VALUES (?, ?, ?, ?, ?, ?)",
            [
              userId,
              filmId,
              avatarId,
              faker.lorem.paragraph(),
              faker.date.past(),
              faker.string.uuid(),
            ]
          )
        );
      }

      await Promise.all(queries);
    } else {
      throw new Error(
        "Not enough data in User, Film or Avatar tables for seeding Commentaire_film"
      );
    }
  } catch (err) {
    console.error("Error inserting commentaires:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

async function insertFilmsIntoWatchlist() {
  try {
    const [filmsCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `Film`"
    );
    const [usersCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `User`"
    );
    const uniqueKeysCombinations = new Set();
    const queries = [];
    const totalOfUniqueKeysCombinations = users.length * films.length;

    if (usersCountRow[0].count && filmsCountRow[0].count) {
      while (
        uniqueKeysCombinations.size <
        faker.number.int({
          min: 0,
          max: Math.floor(totalOfUniqueKeysCombinations / 4),
        })
      ) {
        const userId = faker.number.int({ min: 1, max: users.length });
        const filmId = faker.number.int({ min: 1, max: films.length });
        const unique_key = `${userId}-${filmId}`;

        if (!uniqueKeysCombinations.has(unique_key)) {
          uniqueKeysCombinations.add(unique_key);
          queries.push(
            database.query(
              "INSERT INTO `Watchlist` (`userId`, `filmId`, `unique_key`) VALUES (?, ?, ?)",
              [userId, filmId, unique_key]
            )
          );
        }
      }

      await Promise.all(queries);
    } else {
      throw new Error(
        "Not enough data in User or Film tables for seeding Watchlist"
      );
    }
  } catch (err) {
    console.error("Error inserting films into watchlist:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

async function insertFilmsIntoFavorites() {
  try {
    const [filmsCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `Film`"
    );
    const [usersCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `User`"
    );
    const uniqueKeysCombinations = new Set();
    const queries = [];
    const totalOfUniqueKeysCombinations = users.length * films.length;

    if (usersCountRow[0].count && filmsCountRow[0].count) {
      while (
        uniqueKeysCombinations.size <
        faker.number.int({
          min: 0,
          max: Math.floor(totalOfUniqueKeysCombinations / 4),
        })
      ) {
        const userId = faker.number.int({ min: 1, max: users.length });
        const filmId = faker.number.int({ min: 1, max: films.length });
        const unique_key = `${userId}-${filmId}`;

        if (!uniqueKeysCombinations.has(unique_key)) {
          uniqueKeysCombinations.add(unique_key);
          queries.push(
            database.query(
              "INSERT INTO `Favori_film` (`userId`, `filmId`, `unique_key`) VALUES (?, ?, ?)",
              [userId, filmId, unique_key]
            )
          );
        }
      }

      await Promise.all(queries);
    } else {
      throw new Error(
        "Not enough data in User or Film tables for seeding Favorites"
      );
    }
  } catch (err) {
    console.error("Error inserting films into favorites:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

// Main seed function

async function seed() {
  try {
    await database.query("SET FOREIGN_KEY_CHECKS = 0");
    await database.query("TRUNCATE `Avatar`");
    await database.query("TRUNCATE `Film`");
    await database.query("TRUNCATE `Categorie`");
    await database.query("TRUNCATE `User`");
    await database.query("TRUNCATE `Categorie_par_film`");
    await database.query("TRUNCATE `Commentaire_film`");
    await database.query("TRUNCATE `Watchlist`");
    await database.query("TRUNCATE `Favori_film`");

    await insertAvatars();
    await insertFilms();
    await insertCategories();
    await insertAdmin();
    await insertUsers();

    // Verify the insertions
    const [avatarsCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `Avatar`"
    );

    const [filmsCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `Film`"
    );

    const [categoriesCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `Categorie`"
    );

    const [usersCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `User`"
    );

    if (
      filmsCountRow[0].count >= films.length &&
      categoriesCountRow[0].count >= categories.length
    ) {
      await insertFilmCategorie();
    } else {
      throw new Error(
        "Not enough data in Film or Categorie tables for seeding Categorie_par_film"
      );
    }

    if (
      usersCountRow[0].count >= users.length &&
      filmsCountRow[0].count >= films.length &&
      avatarsCountRow[0].count >= avatars.length
    ) {
      await insertCommentaires();
    } else {
      throw new Error(
        "Not enough data in User or Film tables for seeding Commentaire_film"
      );
    }

    if (
      usersCountRow[0].count >= users.length &&
      filmsCountRow[0].count >= films.length
    ) {
      await insertFilmsIntoWatchlist();
      await insertFilmsIntoFavorites();
    }

    await database.query("SET FOREIGN_KEY_CHECKS = 1");

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error during database seeding:", err.message);
  } finally {
    database.end();
  }
}

// Run the seed function
seed();

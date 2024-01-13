/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");
const argon2 = require("argon2");

// Import database client
const database = require("./database/client");

const users = require("./src/services/users");
const films = require("./src/services/films");
const categories = require("./src/services/categories");
const avatars = require("./src/services/avatars");

async function insertAdmin() {
  try {
    const password = "admin";
    const hashedPassword = argon2.hash(password); // Hash the password

    hashedPassword.then((hashed) => {
      return database.query(
        "INSERT INTO `User` (`name`, `email`, `naissance`, `civility`, `hashed_password`, `IsAdmin`, `avatar`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [
          "Admin",
          "admin@admin.admin",
          "2000-01-01 00:00:00",
          1,
          hashed,
          1,
          "https://avatars.githubusercontent.com/u/97165289",
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
            "INSERT INTO `User` (`name`, `email`, `naissance`, `civility`, `hashed_password`, `IsAdmin`, `avatar`) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [
              users[i].name,
              users[i].email,
              users[i].naissance,
              users[i].civility,
              hashed,
              0,
              users[i].avatar,
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

async function insertAvatars() {
  try {
    const queries = [];
    for (let i = 0; i < avatars.length; i += 1) {
      queries.push(
        database.query("INSERT INTO `Avatar` (`url`) VALUES (?)", [
          avatars[i].url,
        ])
      );
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting avatars:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

// Join tables

async function insertFilmCategorie() {
  try {
    const queries = [];
    for (let i = 0; i < 20; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO `Categorie_par_film` (`filmId`, `categorieId`, `unique_key`) VALUES (?, ?, ?)",
          [
            faker.number.int({ min: 1, max: films.length }),
            faker.number.int({ min: 1, max: categories.length }),
            faker.string.uuid(),
          ]
        )
      );
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting film_categorie:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

async function insertCommentaires() {
  try {
    const queries = [];
    for (let i = 0; i < 1000; i += 1) {
      const randomDate = faker.date
        .past()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      queries.push(
        database.query(
          "INSERT INTO `Commentaire_film` (`userId`, `filmId`, `content`, `date`, `unique_key`) VALUES (?, ?, ?, ?, ?)",
          [
            faker.number.int({ min: 1, max: users.length }),
            faker.number.int({ min: 1, max: films.length }),
            faker.lorem.paragraph(),
            randomDate,
            faker.string.uuid(),
          ]
        )
      );
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting commentaires:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

async function insertAvatarUser() {
  try {
    const queries = [];
    for (let i = 0; i < 10; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO `Avatar_user` (`userId`, `avatarId`, `unique_key`) VALUES (?, ?, ?)",
          [
            faker.number.int({ min: 1, max: users.length }),
            faker.number.int({ min: 1, max: avatars.length }),
            faker.string.uuid(),
          ]
        )
      );
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting avatar_user:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

// Main seed function

async function seed() {
  try {
    await database.query("SET FOREIGN_KEY_CHECKS = 0");
    await database.query("TRUNCATE `User`");
    await database.query("TRUNCATE `Film`");
    await database.query("TRUNCATE `Categorie`");
    await database.query("TRUNCATE `Avatar`");
    await database.query("TRUNCATE `Categorie_par_film`");
    await database.query("TRUNCATE `Commentaire_film`");
    await database.query("TRUNCATE `Avatar_user`");

    await insertAdmin();
    await insertUsers();
    await insertFilms();
    await insertCategories();
    await insertAvatars();

    // Verify the insertions
    const [filmsCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `Film`"
    );
    const [categoriesCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `Categorie`"
    );
    const [usersCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `User`"
    );

    const [avatarsCountRow] = await database.query(
      "SELECT COUNT(*) AS count FROM `Avatar`"
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
      filmsCountRow[0].count >= films.length
    ) {
      await insertCommentaires();
    } else {
      throw new Error(
        "Not enough data in User or Film tables for seeding Commentaire_film"
      );
    }

    if (
      usersCountRow[0].count >= users.length &&
      avatarsCountRow[0].count >= avatars.length
    ) {
      await insertAvatarUser();
    } else {
      throw new Error(
        "Not enough data in User or Avatar tables for seeding Avatar_user"
      );
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

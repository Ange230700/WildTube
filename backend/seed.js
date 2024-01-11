/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const films = require("./src/services/films");
const categories = require("./src/services/categories");

async function insertUsers() {
  try {
    const queries = [];
    for (let i = 0; i < 5; i += 1) {
      const randomDate = faker.date
        .past()
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");
      queries.push(
        database.query(
          "INSERT INTO `User` (`name`, `email`, `naissance`, `civility`, `password`, `IsAdmin`, `avatar`) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            faker.person.firstName(),
            faker.internet.email(),
            randomDate,
            faker.number.binary({ min: 0, max: 1 }),
            faker.internet.password(),
            0,
            faker.image.avatarGitHub(),
          ]
        )
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
            faker.number.int({ min: 1, max: 5 }),
            faker.number.int({ min: 1, max: 27 }),
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

async function insertFilmCategorie() {
  try {
    const queries = [];
    for (let i = 0; i < films.length; i += 1) {
      queries.push(
        database.query(
          "INSERT INTO `Categorie_par_film` (`filmId`, `categorieId`) VALUES (?, ?)",
          [i + 1, faker.number.int({ min: 1, max: categories.length })]
        )
      );
    }
    await Promise.all(queries);
  } catch (err) {
    console.error("Error inserting film_categorie:", err.message);
    throw err; // Re-throw the error to be caught in the main seed function
  }
}

async function seed() {
  try {
    await database.query("SET FOREIGN_KEY_CHECKS = 0");
    await database.query("TRUNCATE `User`");
    await database.query("TRUNCATE `Film`");
    await database.query("TRUNCATE `Categorie`");
    await database.query("TRUNCATE `Categorie_par_film`");
    await database.query("TRUNCATE `Commentaire_film`");

    await insertUsers();
    await insertFilms();
    await insertCategories();

    // Verify the insertions
    const [movies] = await database.query(
      "SELECT COUNT(*) AS count FROM `Film`"
    );
    const [genres] = await database.query(
      "SELECT COUNT(*) AS count FROM `Categorie`"
    );
    const [users] = await database.query(
      "SELECT COUNT(*) AS count FROM `User`"
    );

    if (movies[0].count >= films.length && genres[0].count >= genres.length) {
      await insertFilmCategorie();
    } else {
      throw new Error(
        "Not enough data in Film or Categorie tables for seeding Categorie_par_film"
      );
    }

    if (users[0].count >= 5 && movies[0].count >= films.length) {
      await insertCommentaires();
    } else {
      throw new Error(
        "Not enough data in User or Film tables for seeding Commentaire_film"
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

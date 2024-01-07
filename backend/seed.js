/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // % Optional: Truncate tables (remove existing data)
    // await database.query("truncate item");

    await database.query("SET FOREIGN_KEY_CHECKS = 0");
    await database.query("TRUNCATE `User`");
    await database.query("SET FOREIGN_KEY_CHECKS = 1");

    // % Insert fake data into the 'item' table
    // for (let i = 0; i < 10; i += 1) {
    //   queries.push(
    //     database.query("insert into item(title) values (?)", [
    //       faker.lorem.word(),
    //     ])
    //   );
    // }

    for (let i = 0; i < 10; i += 1) {
      const randomDate = faker.date.past();

      const formattedDate = randomDate
        .toISOString()
        .slice(0, 19)
        .replace("T", " ");

      queries.push(
        database.query(
          "INSERT INTO `User` (`name`, `email`, `naissance`, `civility`, `password`, `IsAdmin`, `avatar`) VALUES (?, ?, ?, ?, ?, ?, ?)",
          [
            faker.person.firstName(),
            faker.internet.email(),
            formattedDate,
            faker.number.binary({ min: 0, max: 1 }),
            faker.internet.password(),
            0,
            faker.image.avatarGitHub(),
          ]
        )
      );
    }

    /* ************************************************************************* */

    // Wait for all the insertion queries to complete
    await Promise.all(queries);

    // Close the database connection
    database.end();

    console.info(`${database.databaseName} filled from ${__filename} 🌱`);
  } catch (err) {
    console.error("Error filling the database:", err.message);
  }
};

// Run the seed function
seed();

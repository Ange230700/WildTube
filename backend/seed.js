/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

// Load environment variables from .env file
require("dotenv").config();

// Import Faker library for generating fake data
// const { faker } = require("@faker-js/faker");

// Import database client
const database = require("./database/client");

const seed = async () => {
  try {
    // Declare an array to store the query promises
    // See why here: https://eslint.org/docs/latest/rules/no-await-in-loop
    const queries = [];

    /* ************************************************************************* */

    // Generating Seed Data

    // // Optional: Truncate tables (remove existing data)
    // await database.query("truncate item");
    await database.query("TRUNCATE Categorie_par_film");

    // // Insert fake data into the 'item' table
    // for (let i = 0; i < 10; i += 1) {
    //   queries.push(
    //     database.query("insert into item(title) values (?)", [
    //       faker.lorem.word(),
    //     ])
    //   );
    // }

    // Insert fake data into the 'Categorie_par_film' table
    for (let categorieIndex = 0; categorieIndex < 20; categorieIndex += 1) {
      for (let filmIndex = 0; filmIndex < 20; filmIndex += 1) {
        queries.push(
          database.query(
            "insert into Categorie_par_film(id_categorie,id_film) values (?,?)",
            [categorieIndex, filmIndex]
          )
        );
      }
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

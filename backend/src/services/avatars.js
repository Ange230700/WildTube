/* eslint import/no-extraneous-dependencies: ["error", {"devDependencies": true}] */

const { faker } = require("@faker-js/faker");

const avatars = [];

for (let i = 0; i < 10; i += 1) {
  avatars.push({
    id: i + 1,
    url: faker.image.avatarGitHub(),
  });
}

module.exports = avatars;

'use strict';

var faker = require('faker')

const users = [
  {
    username: 'grotius.hasiholan',
    password: 'admin',
    asAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const users1 = [...Array(99)].map( (user) => (
  {
    username: faker.internet.userName(),
    password: faker.internet.password(),
    asAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

users.push(...users1)

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', users, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Users', null, {})
  }
};

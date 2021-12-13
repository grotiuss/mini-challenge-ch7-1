'use strict';

var faker = require('faker')

const bcrypt = require('bcrypt')
const encrypt = (password) => bcrypt.hashSync(password, 10)

const users = [
  {
    username: 'grotius.hasiholan',
    password: encrypt('admin'),
    asAdmin: true,
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    username: 'grotius',
    password: encrypt('user'),
    asAdmin: false,
    createdAt: new Date(),
    updatedAt: new Date()
  }
]

const users1 = [...Array(199)].map( (user) => (
  {
    username: faker.internet.userName(),
    password: encrypt(faker.internet.password()),
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

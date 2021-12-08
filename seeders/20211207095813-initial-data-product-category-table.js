'use strict';

var faker = require('faker')

const categories = [...Array(10)].map( (category) => (
  {
    name: faker.lorem.words(),
    createdAt: new Date(),
    updatedAt: new Date()
  }
))

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
   await queryInterface.bulkInsert('ProductCategories', categories, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('ProductCategories', null, {})
  }
};


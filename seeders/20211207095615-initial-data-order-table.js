'use strict';

var faker = require('faker')

function randomStatus() {
  var number = Math.floor(Math.random() * 3)
  if( number == 0 ){
    return 'WAITING'
  } else if ( number == 1 ){
    return 'CANCELED'
  } else {
    return 'DONE'
  }
}

const orders = [...Array(100)].map( (order) => (
  {
    product_id: Math.floor(Math.random() * 100) + 1,
    user_id: Math.floor(Math.random() * 100) + 1,
    qty: Math.floor(Math.random() * 100),
    price: faker.commerce.price(),
    transaction_status : randomStatus(),
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
   await queryInterface.bulkInsert('Orders', orders, {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Orders', null, {})
  }
};

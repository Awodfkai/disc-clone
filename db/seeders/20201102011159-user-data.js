'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'Demo User',
        password: '$2a$10$UQ7IS5k7RqbB0UhzJg/8zOIHr/Wrn5ZNqCwMptIK.lMIHqsX2ajHW'
      }
    ], {});  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};

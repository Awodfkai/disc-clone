'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        username: 'DemoUser',
        password: '$2a$10$UQ7IS5k7RqbB0UhzJg/8zOIHr/Wrn5ZNqCwMptIK.lMIHqsX2ajHW',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: 'TestUser',
        password: '$2a$10$UQ7IS5k7RqbB0UhzJg/8zOIHr/Wrn5ZNqCwMptIK.lMIHqsX2ajHW',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});  
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {})
  }
};

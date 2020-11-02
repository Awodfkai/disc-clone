'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'admin',
        invite: true,
        ban: true,
        kick: true,
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: 'basic',
        invite: true,
        ban: false,
        kick: false,
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {})
  }
};

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
      },
      {
        name: 'basic',
        invite: true,
        ban: false,
        kick: false,
        admin: false,
      }
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Roles', null, {})
  }
};

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('ChannelPermissions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      channel_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Channels" },
      },
      role_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "Roles" },
      },
      manage_channel: {
        type: Sequelize.BOOLEAN
      },
      message_read: {
        type: Sequelize.BOOLEAN
      },
      message_write: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('ChannelPermissions');
  }
};
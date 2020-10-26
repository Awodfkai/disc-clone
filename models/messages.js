'use strict';
module.exports = (sequelize, DataTypes) => {
  const Messages = sequelize.define('Messages', {
    channel_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    message: {
      type: DataTypes.STRING
    },
    pinned: DataTypes.BOOLEAN
  }, {});
  Messages.associate = function(models) {
    // associations can be defined here
  };
  return Messages;
};
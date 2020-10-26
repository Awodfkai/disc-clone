'use strict';
module.exports = (sequelize, DataTypes) => {
  const DirectMessages = sequelize.define('DirectMessages', {
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    message: {
      type: DataTypes.STRING
    },
    pinned: DataTypes.BOOLEAN
  }, {});
  DirectMessages.associate = function(models) {
    // associations can be defined here
  };
  return DirectMessages;
};
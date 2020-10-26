'use strict';
module.exports = (sequelize, DataTypes) => {
  const DirectReactions = sequelize.define('DirectReactions', {
    message_id: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  DirectReactions.associate = function(models) {
    // associations can be defined here
  };
  return DirectReactions;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reactions = sequelize.define('Reactions', {
    message_id: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  Reactions.associate = function(models) {
    // associations can be defined here
  };
  return Reactions;
};
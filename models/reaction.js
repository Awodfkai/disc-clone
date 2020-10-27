'use strict';
module.exports = (sequelize, DataTypes) => {
  const Reaction = sequelize.define('Reaction', {
    message_id: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  Reaction.associate = function(models) {
    Reaction.belongsTo(models.Message, {foreignKey: 'message_id'})
  };
  return Reaction;
};
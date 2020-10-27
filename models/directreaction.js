'use strict';
module.exports = (sequelize, DataTypes) => {
  const DirectReaction = sequelize.define('DirectReaction', {
    message_id: DataTypes.INTEGER,
    type: DataTypes.STRING
  }, {});
  DirectReaction.associate = function(models) {
    DirectReaction.belongsTo(models.Message, { foreignKey: "message_id" })
  };
  return DirectReaction;
};
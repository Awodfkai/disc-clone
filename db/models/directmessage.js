'use strict';
module.exports = (sequelize, DataTypes) => {
  const DirectMessage = sequelize.define('DirectMessage', {
    group_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    message: {
      type: DataTypes.STRING
    },
    pinned: DataTypes.BOOLEAN
  }, {});
  DirectMessage.associate = function(models) {
    DirectMessage.belongsTo(models.Group, { foreignKey: "group_id" })
    DirectMessage.belongsTo(models.User, { foreignKey: "user_id" })
    DirectMessage.hasMany(models.DirectReaction, { foreignKey: "message_id", onDelete: 'CASCADE' })
  };
  return DirectMessage;
};
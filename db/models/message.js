'use strict';
module.exports = (sequelize, DataTypes) => {
  const Message = sequelize.define('Message', {
    channel_id: DataTypes.INTEGER,
    username: DataTypes.STRING,
    message: {
      type: DataTypes.STRING
    },
    pinned: DataTypes.BOOLEAN
  }, {});
  Message.associate = function(models) {
    Message.belongsTo(models.Channel, {foreignKey: 'channel_id'})
    Message.hasMany(models.Reaction, {foreignKey: 'message_id', onDelete: 'CASCADE'})
  };
  return Message;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChannelPermission = sequelize.define('ChannelPermission', {
    channel_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    manage_channel: DataTypes.BOOLEAN,
    message_read: DataTypes.BOOLEAN,
    message_write: DataTypes.BOOLEAN
  }, {});
  ChannelPermission.associate = function(models) {
    ChannelPermission.belongsTo(models.Channel, { foreignKey: "channel_id" })
    ChannelPermission.belongsTo(models.Role, { foreignKey: "role_id" })
  };
  return ChannelPermission;
};
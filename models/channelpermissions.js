'use strict';
module.exports = (sequelize, DataTypes) => {
  const ChannelPermissions = sequelize.define('ChannelPermissions', {
    channel_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    manage_channel: DataTypes.BOOLEAN,
    message_read: DataTypes.BOOLEAN,
    message_write: DataTypes.BOOLEAN
  }, {});
  ChannelPermissions.associate = function(models) {
    // associations can be defined here
  };
  return ChannelPermissions;
};
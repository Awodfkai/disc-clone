'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channel = sequelize.define('Channel', {
    name: DataTypes.STRING,
    server_id: DataTypes.INTEGER
  }, {});
  Channel.associate = function(models) {
    Channel.belongsTo(models.Server, { foreignKey: "server_id" })
    Channel.hasMany(models.Message, {foreignKey: "channel_id", onDelete: 'CASCADE' })
    Channel.hasMany(models.ChannelPermission, { foreignKey: "channel_id", onDelete: 'CASCADE' })
  };
  return Channel;
};
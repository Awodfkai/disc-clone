'use strict';
module.exports = (sequelize, DataTypes) => {
  const Server = sequelize.define('Server', {
    name: DataTypes.STRING
  }, {});
  Server.associate = function(models) {
    Server.hasMany(models.ServerMember, {foreignKey: 'server_id', onDelete:'CASCADE'})
    Server.hasMany(models.Channel, {foreignKey: 'channel_id', onDelete:'CASCADE'})
  };
  return Server;
};
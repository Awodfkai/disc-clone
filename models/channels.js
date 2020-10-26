'use strict';
module.exports = (sequelize, DataTypes) => {
  const Channels = sequelize.define('Channels', {
    name: DataTypes.STRING,
    server_id: DataTypes.INTEGER
  }, {});
  Channels.associate = function(models) {
    // associations can be defined here
  };
  return Channels;
};
'use strict';
module.exports = (sequelize, DataTypes) => {
  const Servers = sequelize.define('Servers', {
    name: DataTypes.STRING
  }, {});
  Servers.associate = function(models) {
    // associations can be defined here
  };
  return Servers;
};
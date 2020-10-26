'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServerMembers = sequelize.define('ServerMembers', {
    server_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {});
  ServerMembers.associate = function(models) {
    // associations can be defined here
  };
  return ServerMembers;
};
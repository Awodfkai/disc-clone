'use strict';
module.exports = (sequelize, DataTypes) => {
  const Role = sequelize.define('Role', {
    name: DataTypes.STRING,
    invite: DataTypes.BOOLEAN,
    ban: DataTypes.BOOLEAN,
    kick: DataTypes.BOOLEAN,
    admin: DataTypes.BOOLEAN
  }, {});
  Role.associate = function(models) {
    Role.hasMany(models.ServerMember, {foreignKey:'role_id', onDelete:'CASCADE'})
  };
  return Role;
};
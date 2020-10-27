'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING.BINARY,
  }, {});
  User.associate = function(models) {
    User.hasMany(models.Message, {foreignKey:'user_id', onDelete:'CASCADE'})
    User.hasMany(models.DirectMessage, { foreignKey: 'user_id', onDelete: 'CASCADE' })
    User.hasMany(models.ServerMember, { foreignKey: 'user_id', onDelete: 'CASCADE' })
    User.hasMany(models.GroupMember, { foreignKey: 'user_id', onDelete: 'CASCADE' })
  };
  return User;
};
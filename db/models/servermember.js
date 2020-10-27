'use strict';
module.exports = (sequelize, DataTypes) => {
  const ServerMember = sequelize.define('ServerMember', {
    server_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {});
  ServerMember.associate = function(models) {
    ServerMember.belongsTo(models.Server, {foreignKey:'server_id'})
    ServerMember.belongsTo(models.User, { foreignKey: 'user_id' })
    ServerMember.belongsTo(models.Role, { foreignKey: 'role_id' })
  };
  return ServerMember;
};
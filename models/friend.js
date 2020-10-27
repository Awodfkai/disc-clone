'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friend = sequelize.define('Friend', {
    user_id: DataTypes.INTEGER,
    friend_id: DataTypes.INTEGER
  }, {});
  Friend.associate = function(models) {
    Friend.belongsTo(models.User, { foreignKey: 'user_id' })
    Friend.belongsTo(models.User, { foreignKey: 'friend_id' })
  };
  return Friend;
};
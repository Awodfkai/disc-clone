'use strict';
module.exports = (sequelize, DataTypes) => {
  const Friends = sequelize.define('Friends', {
    user_id: DataTypes.INTEGER,
    friend_id: DataTypes.INTEGER
  }, {});
  Friends.associate = function(models) {
    // associations can be defined here
  };
  return Friends;
};
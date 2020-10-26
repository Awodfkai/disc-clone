'use strict';
module.exports = (sequelize, DataTypes) => {
  const GroupMembers = sequelize.define('GroupMembers', {
    group_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {});
  GroupMembers.associate = function(models) {
    // associations can be defined here
  };
  return GroupMembers;
};
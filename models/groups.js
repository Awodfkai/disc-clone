'use strict';
module.exports = (sequelize, DataTypes) => {
  const Groups = sequelize.define('Groups', {
    name: DataTypes.STRING
  }, {});
  Groups.associate = function(models) {
    // associations can be defined here
  };
  return Groups;
};
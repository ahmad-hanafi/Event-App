'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ConfirmEvent extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ConfirmEvent.belongsTo(models.User, {foreignKey: 'userID'})
      ConfirmEvent.belongsTo(models.Event, {foreignKey: 'eventID'})
    }
  };
  ConfirmEvent.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    confirmDate: DataTypes.DATE,
    isApprove: DataTypes.BOOLEAN,
    remark: DataTypes.STRING,
    userID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    },
    eventID: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Events',
        key: 'id'
      },
      onUpdate: 'cascade',
      onDelete: 'cascade',
    }
  }, {
    sequelize,
    modelName: 'ConfirmEvent',
  });
  return ConfirmEvent;
};
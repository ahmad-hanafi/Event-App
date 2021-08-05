'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Event.belongsToMany(models.User, {through: 'ConfirmEvent', foreignKey: 'eventID'})
    }
  };
  Event.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Name is required"
        }
      }
    },
    date1: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: "Proposed Date 1 is required"
        },
        ischeckDate() {
          const today = new Date()
          if(this.start <= today) {
            throw new Error("Date must more than today")
          }
        },
    }},
    date2: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: "Proposed Date 2 is required"
        },
        ischeckDate() {
          const today = new Date()
          if(this.start <= today) {
            throw new Error("Date must more than today")
          }
        },
    }},
    date3: {
      type: DataTypes.DATE,
      validate: {
        notEmpty: {
          args: true,
          msg: "Proposed Date 3 is required"
        },
        ischeckDate() {
          const today = new Date()
          if(this.start <= today) {
            throw new Error("Date must more than today")
          }
        },
    }},
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Location is required"
        }
      }
    },
    eventStatus: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: "Event Status either Approve or Pending"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Event',
  });
  return Event;
};
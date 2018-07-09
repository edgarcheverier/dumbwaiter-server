const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const Order = require('../Order/Order');
const Table = require('../Table/Table');
const User = require('../User/User');

const tableName = 'connection';

const Connection = sequelize.define(
  'Connection',
  {
    type: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
      default: 'ACTIVE', //ACTIVE | CLOSED
    },
    code: {
      type: Sequelize.STRING,
      require: true,
    },
    tableId: {
      type: Sequelize.INTEGER,
      require: true,
    },
    restaurantId: {
      type: Sequelize.INTEGER,
      require: true,
    },
  },
  { tableName }
);

Connection.hasMany(Order, {
  as: 'Orders',
  foreignKey: 'orderId',
});
Connection.belongsToMany(User, {
  through: 'ConnectionUser',
});
User.belongsToMany(Connection, {
  through: 'ConnectionUser',
});

module.exports = Connection;

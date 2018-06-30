const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const Order = require('../Order/Order');
const Table = require('../Table/Table');
const User = require('../User/User');

const tableName = 'connection';

const Connection = sequelize.define('Connection', {
type: {
  type: Sequelize.STRING
},
status: {
  type: Sequelize.STRING,
  default: 'ACTIVE' //ACTIVE | CLOSED
}

}, {tableName});

Connection.hasMany(Order, { as: 'Orders', foreignKey: 'orderId' });
Connection.hasMany(User, { as: 'Users', foreignKey: 'userId' });
module.exports = Connection;

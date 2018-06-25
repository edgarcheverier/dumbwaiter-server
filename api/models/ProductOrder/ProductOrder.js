const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const tableName = 'productorder';

const ProductOrder = sequelize.define('ProductOrder', {
status: {
  type: Sequelize.STRING
}
price: {
  type: Sequelize.STRING
}

}, {tableName});



module.exports = ProductOrder;

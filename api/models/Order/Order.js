const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const ProductOrder = require('../ProductOrder/ProductOrder');

const tableName = 'order';

const Order = sequelize.define(
  'FoodOrder',
  {
    status: {
      type: Sequelize.STRING, //PENDING_PAYMENT | PAID | CANCELLED
      default: 'PENDING_PAYMENT',
    },
  },
  { tableName }
);

Order.hasMany(ProductOrder, {
  as: 'Products',
  foreignKey: 'orderId',
});
module.exports = Order;

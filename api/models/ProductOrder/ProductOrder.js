const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const tableName = 'productorder';
const Product = require('../Product/Product');

const ProductOrder = sequelize.define(
  'ProductOrder',
  {
    status: {
      type: Sequelize.STRING,
      default: 'ORDERED', // ORDERED | SERVED | CANCELLED
    },
    price: {
      type: Sequelize.STRING,
    },
  },
  { tableName }
);

ProductOrder.belongsTo(Product, { foreignKey: 'productId' });
module.exports = ProductOrder;

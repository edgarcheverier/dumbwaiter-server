const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');


const tableName = 'products';


const Product = sequelize.define('Product', {
name: {
  type: Sequelize.STRING
},
description: {
  type: Sequelize.TEXT,
},
price: {
  type: Sequelize.STRING,
}

}, {tableName});

module.exports = Product;

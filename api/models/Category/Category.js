const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const Product = require('../Product/Product');

const tableName = 'categories';

const Category = sequelize.define('Category', {
name: {
  type: Sequelize.STRING
}

}, {tableName});



module.exports = Category;

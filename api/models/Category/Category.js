const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');


const tableName = 'categories';

const Product = require('../Product/Product');



const Category = sequelize.define('Category', {
name: {
  type: Sequelize.STRING
}

}, {tableName});

Category.hasMany(Product, {through: 'ProductCategory'})


module.exports = Category;

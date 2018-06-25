const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const tableName = 'categories';

const Category = sequelize.define('Category', {
name: {
  type: Sequelize.STRING
}

}, {tableName});

module.exports = Category;

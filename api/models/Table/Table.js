const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const Restaurant = require('../Restaurant/Restaurant');

const tableName = 'tables';

const Table = sequelize.define('Table', {
  name: {
    type: Sequelize.STRING,
  },
  positionX: {
    type: Sequelize.INTEGER,
  },
  positionY: {
    type: Sequelize.INTEGER,
  },
}, { tableName });

module.exports = Table;

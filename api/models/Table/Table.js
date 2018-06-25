const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const tableName = 'tables';

const Table = sequelize.define('Table', {
  number: {
    type: Sequelize.STRING,
  },
}, { tableName });

module.exports = Table;

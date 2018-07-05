const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const tableName = 'tableCodes';

const TableCodes = sequelize.define(
  'TableCodes',
  {
    code: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.STRING,
      default: 'PENDING_CONNECTION', //PENDING_CONNECTION | ACTIVE | CLOSED
    },
  },
  { tableName }
);

module.exports = TableCodes;

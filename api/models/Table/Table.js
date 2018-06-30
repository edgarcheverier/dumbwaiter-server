const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const Connection = require('../Connection/Connection');

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

Table.hasMany(Connection, { as: 'Connections', foreignKey: 'connectionId' });
module.exports = Table;

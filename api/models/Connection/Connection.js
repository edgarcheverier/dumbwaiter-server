const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const tableName = 'connection';

const Connection = sequelize.define('Connection', {
type: {
  type: Sequelize.STRING
}
date: {
  type: Sequelize.STRING
}

}, {tableName});



module.exports = Connection;

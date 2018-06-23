const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const tableName = 'restaurants';

const Restaurant = sequelize.define('Restaurant', {
  name: {
    type: Sequelize.STRING,
  },
}, { tableName });

module.exports = Restaurant;

const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const tableName = 'restaurants';

const Restaurant = sequelize.define('Restaurant', {
  name: {
    type: Sequelize.STRING,
  },
  description: {
    type: Sequelize.TEXT,
  },
  latitude: {
    type: Sequelize.STRING,
  },
  longitude: {
    type: Sequelize.STRING,
  },
}, { tableName });

module.exports = Restaurant;

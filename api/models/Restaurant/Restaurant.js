const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const Table = require('../Table/table');

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

Restaurant.hasMany(Table, { as: 'tables', foreignKey: 'restaurantId' });
module.exports = Restaurant;

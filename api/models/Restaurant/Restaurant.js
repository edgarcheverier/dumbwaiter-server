const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
const Product = require('../Product/Product');
const Table = require('../Table/Table');
const User = require('../User/User');

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
  type: {
    type: Sequelize.STRING,
  },
}, { tableName });

Restaurant.hasMany(Table, { as: 'tables', foreignKey: 'restaurantId' });
Restaurant.hasMany(Product, { as: 'products', foreignKey: 'restaurantId' });
Restaurant.belongsTo(User);
module.exports = Restaurant;

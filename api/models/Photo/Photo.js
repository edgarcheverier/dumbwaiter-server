const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
// const Product = require('../Product/Product');

const tableName = 'photo';

const Photo = sequelize.define('Photo', {
url: {
  type: Sequelize.STRING
},
type: {
  type: Sequelize.STRING
}
externalId: {
  type: Sequelize.INTEGER
}

}, {tableName});

module.exports = Photo;

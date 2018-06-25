const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
// const Product = require('../Product/Product');

const tableName = 'photo';

const Photo = sequelize.define('Photo', {
url: {
  type: Sequelize.STRING
}
type: {
  type: Sequelize.STRING
}

}, {tableName});



module.exports = Photo;

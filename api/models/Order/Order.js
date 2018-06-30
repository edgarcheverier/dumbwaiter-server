const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');
// const Product = require('../Product/Product');

const tableName = 'notification';

const Notification = sequelize.define('Notification', {
text: {
  type: Sequelize.STRING
},
type: {
  type: Sequelize.STRING
}

}, {tableName});



module.exports = Notification;

const Sequelize = require('sequelize');

const sequelize = require('../../../config/database');

const tableName = 'notification';

const Notification = sequelize.define(
  'Notification',
  {
    text: {
      type: Sequelize.STRING,
    },
    type: {
      type: Sequelize.STRING,
    },
  },
  { tableName }
);

module.exports = Notification;

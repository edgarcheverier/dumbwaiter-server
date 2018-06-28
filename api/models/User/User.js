const Sequelize = require('sequelize');
const bcryptSevice = require('../../services/bcrypt.service');

const sequelize = require('../../../config/database');

const hooks = {
  beforeCreate(user) {
    user.password = bcryptSevice().password(user); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'users';

const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
  },
  lastname: {
    type: Sequelize.STRING,
  },
  address: {
    type: Sequelize.STRING,
  },
  externalLoginId: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  type: {
    type: Sequelize.STRING,
    default: 'USER', // USER | RESTAURANT_OWNER | RUNNER
  },
}, { hooks, tableName });

// eslint-disable-next-line
User.prototype.toJSON = function () {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = User;

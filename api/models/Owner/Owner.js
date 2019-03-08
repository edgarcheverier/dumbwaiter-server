const Sequelize = require('sequelize');
const bcryptSevice = require('../../services/bcrypt.service');

const sequelize = require('../../../config/database');

const hooks = {
  beforeCreate(owner) {
    owner.password = bcryptSevice().password(owner); // eslint-disable-line no-param-reassign
  },
};

const tableName = 'owners';

const Owner = sequelize.define(
  'Owner',
  {
    name: {
      type: Sequelize.STRING,
    },
    lastname: {
      type: Sequelize.STRING,
    },
    address: {
      type: Sequelize.STRING,
    },
    password: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
    },
  },
  { hooks, tableName }
);

// Shouldn't owner have a hasMany pointing to restaurants?

// eslint-disable-next-line
Owner.prototype.toJSON = function() {
  const values = Object.assign({}, this.get());
  delete values.password;
  return values;
};

module.exports = Owner;

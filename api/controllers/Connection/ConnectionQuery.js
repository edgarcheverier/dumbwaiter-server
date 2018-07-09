const {
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');

const {
  protectRMSRestaurant,
} = require('../protectDecorator');

const UserType = require('../../models/User/UserType');
const TableType = require('../../models/Table/TableType');
const Connection = require('../../models/Connection/Connection');
const ConnectionType = require('../../models/Connection/ConnectionType');

const connectionQuery = {
  type: new GraphQLList(ConnectionType),
  args: {
    id: {
      name: 'name',
      type: GraphQLInt,
    },
    tableId: {
      name: 'description',
      type: GraphQLInt,
    },
    code: {
      name: 'code',
      type: GraphQLString,
    },
    status: {
      name: 'status',
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
    restaurantId: {
      name: 'restaurantId',
      type: GraphQLString,
    },
  },
  resolve: async (connection, args) =>
    Connection.findAll({ where: args }),
};

module.exports = protectRMSRestaurant(connectionQuery);

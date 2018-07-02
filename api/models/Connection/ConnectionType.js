const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const UserType = require('../User/UserType');
const OrderType = require('../Order/OrderType');
const TableType = require('../Table/TableType');
const Table = require('../Table/Table');

const ConnectionType = new GraphQLObjectType({
  name: 'Connection',
  description:
    'This groups the various inventory items into subgroups',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: connection => connection.id,
    },
    type: {
      type: GraphQLInt,
      resolve: connection => connection.type,
    },
    restaurantId: {
      type: GraphQLInt,
      resolve: connection => connection.restaurantId,
    },
    status: {
      type: GraphQLString,
      resolve: connection => connection.status,
    },
    code: {
      type: GraphQLString,
      resolve: connection => connection.code,
    },
    createdAt: {
      type: GraphQLString,
      resolve: connection => connection.createdAt,
    },
    table: {
      type: TableType,
      resolve: async connection => {
        return await Table.findOne({
          where: {
            id: connection.tableId,
          },
        }).then(res => {
          return res;
        });
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve: connection => connection.getUsers(),
    },
  }),
});

module.exports = ConnectionType;

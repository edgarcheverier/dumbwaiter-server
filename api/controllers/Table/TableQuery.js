const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const TableType = require('../../models/Table/TableType');
const Table = require('../../models/Table/Table');

const tableQuery = {
  type: new GraphQLList(TableType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
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
  },
  resolve: (user, args) => Table.findAll({ where: args }),
};

module.exports = userQuery;

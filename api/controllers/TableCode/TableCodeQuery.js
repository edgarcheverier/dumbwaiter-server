const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const TableCodeType = require('../../models/TableCode/TableCodeType');
const TableCode = require('../../models/TableCode/TableCode');

const tableCodeQuery = {
  type: new GraphQLList(TableCodeType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    code: {
      name: 'code',
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
  resolve: (tableCode, args) =>
    TableCode.findAll({ where: args }),
};

module.exports = tableCodeQuery;

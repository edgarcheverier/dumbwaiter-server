const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const TableCodeType = new GraphQLObjectType({
  name: 'TableCode',
  description:
    'This represents each tableCode within the restaurant',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: tableCode => tableCode.id,
    },
    code: {
      type: GraphQLString,
      resolve: tableCode => tableCode.code,
    },
    status: {
      type: GraphQLString,
      resolve: tableCode => tableCode.status,
    },
  }),
});

module.exports = TableCodeType;

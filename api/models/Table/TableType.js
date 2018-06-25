const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const TableType = new GraphQLObjectType({
  name: 'Table',
  description: 'This represents each table within the restaurant',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (table) => table.id,
    },
    number: {
      type: GraphQLString,
      resolve: (table) => table.name,
    },
  }),
});

module.exports = TableType;

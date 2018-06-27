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
    name: {
      type: GraphQLString,
      resolve: (table) => table.name,
    },
    positionX: {
      type: GraphQLInt,
      resolve: (table) => table.positionX,
    },
    positionY: {
      type: GraphQLInt,
      resolve: (table) => table.positionY,
    },
  }),
});

module.exports = TableType;

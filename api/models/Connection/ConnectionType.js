const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');


const ConnectionType = new GraphQLObjectType({
  name: 'Connection',
  description: 'This groups the various inventory items into subgroups',
  fields: () => ({
    type: {
      type: GraphQLInt,
      resolve: (connection) => connection.type,
    },
    date: {
      type: GraphQLString,
      resolve: (connection) => connection.date,
    },

  }),
});

module.exports = ConnectionType;

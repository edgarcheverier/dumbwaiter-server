const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');


const ProductOrderType = new GraphQLObjectType({
  name: 'ProductOrderType',
  description: 'this is the individual order of client - a snapshot of products and prices',
  fields: () => ({
    status: {
      type: GraphQLInt,
      resolve: (productorder) => productorder.status,
    },
    type: {
      type: GraphQLString,
      resolve: (productorder) => productorder.type,
    },

  }),
});

module.exports = ProductOrderType;

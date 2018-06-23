const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');


const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'TThis represents to product inventory for the restaurant',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (product) => product.id,
    },
    name: {
      type: GraphQLString,
      resolve: (product) => product.name,
    },
    description: {
      type: GraphQLString,
      resolve: (product) => product.description,
    },
    price: {
      type: GraphQLFloat,
      resolve: (product) => product.price,
    }
  }),
});

module.exports = ProductType;

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const ProductType = require('../Product/ProductType');

const ProductOrderType = new GraphQLObjectType({
  name: 'ProductOrderType',
  description:
    'this is the individual order of client - a snapshot of products and prices',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: productorder => productorder.id,
    },
    status: {
      type: GraphQLInt,
      resolve: productorder => productorder.status,
    },
    price: {
      type: GraphQLString,
      resolve: productorder => productorder.price,
    },
    product: {
      type: ProductType,
      resolve: productorder => productorder.getProduct(),
    },
  }),
});

module.exports = ProductOrderType;

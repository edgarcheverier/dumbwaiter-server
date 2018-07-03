const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
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
      type: GraphQLString,
      resolve: productorder => productorder.status,
    },
    orderId: {
      type: GraphQLInt,
      resolve: productorder => productorder.orderId,
    },
    price: {
      type: GraphQLFloat,
      resolve: productorder => productorder.price,
    },
    product: {
      type: ProductType,
      resolve: productorder => productorder.getProduct(),
    },
  }),
});

module.exports = ProductOrderType;

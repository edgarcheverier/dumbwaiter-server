const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const ProductOrderType = require('../ProductOrder/ProductOrderType');

const OrderType = new GraphQLObjectType({
  name: 'Order',
  description: 'This is the order of each client',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: order => order.id,
    },
    status: {
      type: GraphQLString,
      resolve: order => order.status,
    },
    products: {
      type: GraphQLList(ProductOrderType),
      resolve: order => order.getProducts(),
    },
  }),
});

module.exports = OrderType;

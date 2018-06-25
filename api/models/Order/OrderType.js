const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');


const OrderType = new GraphQLObjectType({
  name: 'Order',
  description: 'This is the order of each client',
  fields: () => ({
    type: {
      type: GraphQLInt,
      resolve: (order) => order.type,
    },
    text: {
      type: GraphQLString,
      resolve: (order) => order.text,
    },

  }),
});

module.exports = OrderType;

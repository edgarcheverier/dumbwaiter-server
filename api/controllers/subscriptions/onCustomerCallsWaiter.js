const { GraphQLInt, GraphQLString } = require('graphql');
const { pubsub } = require('../../subscriptions');
const NotificationType = require('../../models/Notification/NotificationType');
const { withFilter } = require('graphql-subscriptions');

module.exports = {
  type: NotificationType,
  args: {
    orderId: {
      name: 'orderId',
      type: GraphQLInt,
    },
    connectionId: {
      name: 'connectionId',
      type: GraphQLInt,
    },
    userId: {
      name: 'userId',
      type: GraphQLInt,
    },
    productOrderId: {
      name: 'productOrderId',
      type: GraphQLInt,
    },
    restaurantId: {
      name: 'restaurantId',
      type: GraphQLInt,
    },
    tableCode: {
      name: 'tableCode',
      type: GraphQLString,
    },
    userName: {
      name: 'userName',
      type: GraphQLString,
    },
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator('onCustomerCallsWaiter'),
    (payload, args) => {
      console.log(payload);
      if (args.restaurantId) {
        if (payload.onCustomerCallsWaiter.restaurantId == args.restaurantId) {
          return true;
        }
      }
      return false;
    }
  ),
};

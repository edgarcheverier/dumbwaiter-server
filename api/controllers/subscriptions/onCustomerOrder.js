const { GraphQLInt } = require('graphql');
const { pubsub } = require('../../subscriptions');
const NotificationType = require('../../models/Notification/NotificationType');
const { withFilter } = require('graphql-subscriptions');
const { ON_CUSTOMER_ORDER } = require('./events');

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
    userName: {
      name: 'userName',
      type: GraphQLInt,
    },
    restaurantId: {
      name: 'restaurantId',
      type: GraphQLInt,
    },
  },
  subscribe: withFilter(
    () => pubsub.asyncIterator('onCustomerOrder'),
    (payload, args) => {
      if (args.restaurantId) {
        if (payload.onCustomerOrder.restaurantId == args.restaurantId) {
          return true;
        }
      }
      return false;
    }
  ),
};

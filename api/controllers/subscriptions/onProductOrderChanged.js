const { GraphQLInt } = require('graphql');

const { pubsub } = require('../../subscriptions');
const NotificationType = require('../../models/Notification/NotificationType');
const { withFilter } = require('graphql-subscriptions');

const { protectCustomer } = require('../protectDecorator');

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
  },
  subscribe: withFilter(
    () => {
      return pubsub.asyncIterator('onProductOrderChanged');
    },
    (payload, args) => {
      console.log('firing!');
      if (args.userId) {
        if (payload.onProductOrderChanged.userId == args.userId) {
          return true;
        }
      }
      //TODO it's not filtering by user because the order is not related to the user, only to the connection
      //This should return false if the userId is not the same...
      return true;
    }
  ),
};

const { GraphQLInt } = require('graphql');

const { pubsub } = require('../../subscriptions');
const { ON_ORDER_PRODUCT_CHANGED } = require('./events');
const NotificationType = require('../../models/Notification/NotificationType');
const { withFilter } = require('graphql-subscriptions');

const { protectCustomer } = require('../protectDecorator');

const productOrderChangeSubscription = {
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
    () => pubsub.asyncIterator('onOrderProductChanged'),
    (payload, args) => {
      if (args.userId) {
        if (payload.onOrderProductChanged.userId == args.userId) {
          return true;
        }
      }
      return false;
    }
  ),
};

module.exports = productOrderChangeSubscription;

const { pubsub } = require('../../subscriptions');
const OrderType = require('../../models/Order/OrderType');
const { withFilter } = require('graphql-subscriptions');

module.exports = {
  type: OrderType,
  subscribe: withFilter(
    () => pubsub.asyncIterator('onOrderCreated'),
    (payload, args) => true
  ),
  // subscribe: () => pubsub.asyncIterator('onOrderCreated'),
};

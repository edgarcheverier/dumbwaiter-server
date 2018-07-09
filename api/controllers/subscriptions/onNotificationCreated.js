const { pubsub } = require('../../subscriptions');
const { ON_NOTIFICATION_CREATED } = require('./events');
const NotificationType = require('../../models/Notification/NotificationType');
const { withFilter } = require('graphql-subscriptions');

module.exports = {
  type: NotificationType,
  subscribe: withFilter(
    () => pubsub.asyncIterator(ON_NOTIFICATION_CREATED),
    (payload, args) => {
      console.log(payload);
      console.log(args);
      return true;
    }
  ),
  // subscribe: () => pubsub.asyncIterator('onOrderCreated'),
};

const { pubsub } = require('../../subscriptions');
const { withFilter } = require('graphql-subscriptions');
const ConnectionType = require('../../models/Connection/ConnectionType');

module.exports = {
  type: ConnectionType,
  subscribe: withFilter(
    () => pubsub.asyncIterator('onConnectionCreated'),
    (payload, args) => {
      return payload;
    }
  ),
};

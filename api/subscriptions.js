const { PubSub } = require('graphql-subscriptions');

// You can publish changes from anywhere as long as you include this file and call pubsub.publish(...)
const pubsub = new PubSub();
module.exports = {
  pubsub,
};

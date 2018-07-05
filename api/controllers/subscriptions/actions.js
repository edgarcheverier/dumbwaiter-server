const { pubsub } = require('../../subscriptions'); // import pubsub object for subscriptions to work

const emit = (channel, options) => {
  switch (channel) {
    case 'onCustomerOrder':
      return pubsub.publish('onCustomerOrder', {
        onCustomerOrder: options,
      });

    case 'onCustomerConnection':
      return pubsub.publish('onCustomerConnection', {
        onCustomerConnection: options,
      });

    case 'onOrderProductChanged':
      return pubsub.publish('onOrderProductChanged', {
        onOrderProductChanged: options,
      });

    case 'onCustomerCallsWaiter':
      return pubsub.publish('onCustomerCallsWaiter', {
        onCustomerCallsWaiter: options,
      });
    default:
  }
};

module.exports = {
  emit,
};

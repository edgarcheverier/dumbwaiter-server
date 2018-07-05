//Customer susbscriptions
const onProductOrderChanged = require('./onProductOrderChanged');

//Restaurant Subscriptions
const onCustomerCallsWaiter = require('./onCustomerCallsWaiter');
const onCustomerConnection = require('./onCustomerConnection');
const onCustomerOrder = require('./onCustomerOrder');

module.exports = {
  onCustomerConnection,
  onCustomerOrder,
  onCustomerCallsWaiter,
  onProductOrderChanged,
};

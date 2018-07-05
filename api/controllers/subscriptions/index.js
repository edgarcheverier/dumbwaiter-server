//Customer susbscriptions
const onOrderProductChanged = require('./onProductOrderChanged');

//Restaurant Subscriptions
const onCustomerCallsWaiter = require('./onCustomerCallsWaiter');
const onCustomerConnection = require('./onCustomerConnection');
const onCustomerOrder = require('./onCustomerOrder');

module.exports = {
  onCustomerConnection,
  onCustomerOrder,
  onCustomerCallsWaiter,
  onOrderProductChanged,
};

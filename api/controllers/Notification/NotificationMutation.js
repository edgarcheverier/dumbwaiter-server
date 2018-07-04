const { GraphQLString, GraphQLInt, GraphQLNonNull } = require('graphql');

const { ON_ORDER_PRODUCT_CHANGED } = require('../Subscriptions/events'); // import pubsub object for subscriptions to work

const NotificationType = require('../../models/Notification/NotificationType');
const Notification = require('../../models/Notification/Notification');

const createNotification = {
  type: NotificationType,
  description: 'The mutation that allows you to create a new notification',
  args: {
    text: {
      name: 'text',
      type: GraphQLNonNull(GraphQLString),
    },
    type: {
      name: 'type',
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (notification, { text, type }) => {
    const createNotification = {
      text,
      type,
    };
    const newNotification = await Notification.create(createNotification);
    return newNotification;
  },
};

const deleteNotification = {
  type: NotificationType,
  description: 'The mutation that allows you to delete a existing notification',
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
  },
  resolve: (notification, { id }) =>
    Notification.delete().where({
      id,
    }),
};

module.exports = {
  createNotification,
  deleteNotification,
};

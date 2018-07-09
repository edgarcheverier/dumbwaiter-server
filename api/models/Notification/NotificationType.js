const { GraphQLObjectType, GraphQLInt, GraphQLString } = require('graphql');

const NotificationType = new GraphQLObjectType({
  name: 'Notification',
  description: 'This groups the various inventory items into subgroups',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: notification => notification.id,
    },
    type: {
      type: GraphQLString,
      resolve: notification => notification.type,
    },
    restaurantId: {
      type: GraphQLInt,
      resolve: notification => notification.restaurantId,
    },
    userId: {
      type: GraphQLInt,
      resolve: notification => notification.userId,
    },
    connectionId: {
      type: GraphQLInt,
      resolve: notification => notification.connectionId,
    },
    orderId: {
      type: GraphQLInt,
      resolve: notification => notification.orderId,
    },
    productOrderId: {
      type: GraphQLInt,
      resolve: notification => notification.productOrderId,
    },
    productStatus: {
      type: GraphQLString,
      resolve: notification => notification.productStatus,
    },
    text: {
      type: GraphQLString,
      resolve: notification => notification.text,
    },
    userName: {
      type: GraphQLString,
      resolve: notification => notification.userName,
    },
    tableCode: {
      type: GraphQLString,
      resolve: notification => notification.tableCode,
    },
    createdAt: {
      type: GraphQLString,
      resolve: notification => notification.createdAt,
    },
  }),
});

module.exports = NotificationType;

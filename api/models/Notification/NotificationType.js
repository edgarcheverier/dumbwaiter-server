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
    text: {
      type: GraphQLString,
      resolve: notification => notification.text,
    },
    createdAt: {
      type: GraphQLString,
      resolve: notification => notification.createdAt,
    },
  }),
});

module.exports = NotificationType;

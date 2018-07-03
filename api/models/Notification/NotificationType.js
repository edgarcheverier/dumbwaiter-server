const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');


const NotificationType = new GraphQLObjectType({
  name: 'Notification',
  description: 'This groups the various inventory items into subgroups',
  fields: () => ({
    type: {
      type: GraphQLInt,
      resolve: (notification) => notification.type,
    },
    text: {
      type: GraphQLString,
      resolve: (notification) => notification.text,
    },

  }),
});

module.exports = NotificationType;

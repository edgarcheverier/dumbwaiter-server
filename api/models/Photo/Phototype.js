const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const PhotoType = new GraphQLObjectType({
  name: 'Photo',
  description: 'This includes pictures of all stock',
  fields: () => ({
    url: {
      type: GraphQLString,
      resolve: (photo) => photo.url,
    },
    type: {
      type: GraphQLString,
      resolve: (photo) => photo.text,
    },
    externalId: {
      type: GraphQLInt,
      resolve: (photo) => photo.externalId,
    },

  }),
});

module.exports = PhotoType;

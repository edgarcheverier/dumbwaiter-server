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
      type: GraphQLInt,
      resolve: (photo) => photo.type,
    },
    type: {
      type: GraphQLString,
      resolve: (photo) => photo.text,
    },

  }),
});

module.exports = PhotoType;

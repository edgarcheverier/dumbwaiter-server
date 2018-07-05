const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

// const NoteType = require('../Note/NoteType');

const OwnerType = new GraphQLObjectType({
  name: 'Owner',
  description: 'This represents a Owner',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: owner => owner.id,
    },
    name: {
      type: GraphQLString,
      resolve: owner => owner.name,
    },
    email: {
      type: GraphQLString,
      resolve: owner => owner.email,
    },
    createdAt: {
      type: GraphQLString,
      resolve: owner => owner.createdAt,
    },
    updatedAt: {
      type: GraphQLString,
      resolve: owner => owner.updatedAt,
    },
  }),
});

module.exports = OwnerType;

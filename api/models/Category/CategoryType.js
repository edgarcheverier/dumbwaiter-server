const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');


const CategoryType = new GraphQLObjectType({
  name: 'Category',
  description: 'This groups the various inventory items into subgroups',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (category) => category.id,
    },
    name: {
      type: GraphQLString,
      resolve: (category) => category.name,
    },
  }),
});

module.exports = CategoryType;

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
} = require('graphql');

const RestaurantType = new GraphQLObjectType({
  name: 'Restaurant',
  description: 'This represents a Restaurant',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (restaurant) => restaurant.id,
    },
    name: {
      type: GraphQLString,
      resolve: (restaurant) => restaurant.name,
    }
  }),
});

module.exports = RestaurantType;

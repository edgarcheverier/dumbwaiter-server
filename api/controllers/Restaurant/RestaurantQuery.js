const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const RestaurantType = require('../../models/Restaurant/RestaurantType');
const Restaurant = require('../../models/Restaurant/Restaurant');

const restaurantQuery = {
  type: new GraphQLList(RestaurantType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: (restaurant, args) => Restaurant.findAll({ where: args }),
};

module.exports = restaurantQuery;

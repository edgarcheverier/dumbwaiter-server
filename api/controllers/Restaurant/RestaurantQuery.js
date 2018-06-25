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
    restaurantname: {
      name: 'name',
      type: GraphQLString,
    },
    description: {
      name: 'description',
      type: GraphQLString,
    },
    latitude: {
      name: 'latitude',
      type: GraphQLString,
    },
    longitude: {
      name: 'longitude',
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

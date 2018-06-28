const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const RestaurantType = require('../../models/Restaurant/RestaurantType');
const Restaurant = require('../../models/Restaurant/Restaurant');

const ProductType = require('../../models/Product/ProductType');
const TableType = require('../../models/Table/TableType');

const restaurantQuery = {
  type: new GraphQLList(RestaurantType),
  args: {
    id: {
      type: GraphQLInt,
    },
    name: {
      type: GraphQLString,
    },
    type: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    latitude: {
      type: GraphQLString,
    },
    longitude: {
      type: GraphQLString,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    userId: {
      name: 'userId',
      type: GraphQLInt
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: (restaurant, args) => Restaurant.findAll({ where: args }),
};

module.exports = restaurantQuery;

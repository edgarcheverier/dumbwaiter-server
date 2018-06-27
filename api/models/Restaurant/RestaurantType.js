const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLString,
} = require('graphql');

const CategoryType = require('../Category/CategoryType');
const ProductType = require('../Product/ProductType');
const TableType = require('../Table/TableType');
const UserType = require('../User/UserType');

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
    },
    description: {
      type: GraphQLString,
      resolve: (restaurant) => restaurant.name,
    },
    photo: {
      type: GraphQLList(GraphQLString),
      resolve: (restaurant) => {
        //TODO add connection to Photo model
        return [
          "https://media.nngroup.com/media/people/photos/IMG_2366-copy-400x400.jpg.400x400_q95_autocrop_crop_upscale.jpg",
          "https://media.nngroup.com/media/people/photos/IMG_2366-copy-400x400.jpg.400x400_q95_autocrop_crop_upscale.jpg",
        ]
      },
    },
    type: {
      type: GraphQLString,
      resolve: (restaurant) => restaurant.type,
    },
    longitude: {
      type: GraphQLString,
      resolve: (restaurant) => restaurant.longitude,
    },
    latitude: {
      type: GraphQLString,
      resolve: (restaurant) => restaurant.latitude,
    },
    tables: {
      type: GraphQLList(TableType),
      resolve (restaurant) {
        return restaurant.getTables();
      }
    },
    owner: {
      type: UserType,
      resolve (restaurant) {
        return restaurant.getUser();
      }
    },
    products: {
      type: GraphQLList(ProductType),
      resolve (restaurant) {
        return restaurant.getProducts();
      }
    }
  }),
});

module.exports = RestaurantType;

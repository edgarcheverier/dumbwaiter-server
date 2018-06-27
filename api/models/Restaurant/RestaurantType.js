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
const PhotoType = require('../Photo/PhotoType');
const Photo = require('../Photo/Photo');

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
    photos: {
      type: GraphQLList(PhotoType),
      resolve: async (restaurant) => {
        const listPhotos = [];
        return await Photo.findAll({ where: {
          externalId: restaurant.id, type: 'RESTAURANT' }
        }).then(res => {
          res.forEach((resultSetItem) => {
            const photo = resultSetItem.get();
            listPhotos.push({ url: photo.url });
          });
          return listPhotos;
        });
      }
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

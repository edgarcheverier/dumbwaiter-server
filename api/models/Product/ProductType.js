const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLString,
} = require('graphql');

const CategoryType = require('../Category/CategoryType');
const PhotoType = require('../Photo/PhotoType');
const Photo = require('../Photo/Photo');

const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'This represents to product inventory for the restaurant',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: product => product.id,
    },
    name: {
      type: GraphQLString,
      resolve: product => product.name,
    },
    description: {
      type: GraphQLString,
      resolve: product => product.description,
    },
    similar: {
      type: GraphQLList(GraphQLString),
      resolve: product => {
        return ['Product 1', 'Product 2', 'Product 3'];
      },
    },
    photos: {
      type: GraphQLList(PhotoType),
      resolve: async product => {
        const listPhotos = [];
        return await Photo.findAll({
          where: {
            externalId: product.id,
            type: 'PRODUCT',
          },
        }).then(res => {
          res.forEach(resultSetItem => {
            const photo = resultSetItem.get();
            listPhotos.push({ url: photo.url });
          });
          return listPhotos;
        });
      },
    },
    categories: {
      type: new GraphQLList(CategoryType),
      resolve: product => product.getCategories(),
    },
    price: {
      type: GraphQLFloat,
      resolve: product => product.price,
    },
  }),
});

module.exports = ProductType;

const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
} = require('graphql');

const CategoryType = require('../Category/CategoryType');


const ProductType = new GraphQLObjectType({
  name: 'Product',
  description: 'This represents to product inventory for the restaurant',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: (product) => product.id,
    },
    name: {
      type: GraphQLString,
      resolve: (product) => product.name,
    },
    description: {
      type: GraphQLString,
      resolve: (product) => product.description,

    },
    category: {
      type: new GraphQLList(CategoryType),
      resolve: (product) => product.getCategories(),
    },
    price: {
      type: GraphQLFloat,
      resolve: (product) => product.price,
    }
  }),
});

module.exports = ProductType;

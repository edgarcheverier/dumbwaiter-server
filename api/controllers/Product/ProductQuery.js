const {
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');

const { protectRMSRestaurant } = require('../protectDecorator');
const ProductType = require('../../models/Product/ProductType');
const Product = require('../../models/Product/Product');

const productQuery = {
  type: new GraphQLList(ProductType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    description: {
      name: 'description',
      type: GraphQLString,
    },
    price: {
      name: 'price',
      type: GraphQLFloat,
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
  resolve: (product, args, context, more, ctx) => {
    console.log('Args', args);
    console.log('Context', context);
    return Product.findAll({ where: args })
  },
};

module.exports = {
  productQuery,
  productQueryRms: protectRMSRestaurant(productQuery)
}

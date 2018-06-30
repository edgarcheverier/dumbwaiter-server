const {
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
} = require('graphql');

const ProductOrderType = require('../../models/ProductOrder/ProductOrderType');
const ProductOrder = require('../../models/ProductOrder/ProductOrder');

const productOrderQuery = {
  type: new GraphQLList(ProductOrderType),
  args: {
    productId: {
      name: 'name',
      type: GraphQLInt,
    },
    orderId: {
      name: 'description',
      type: GraphQLInt,
    },
    price: {
      name: 'price',
      type: GraphQLFloat,
    },
    status: {
      name: 'status',
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
  resolve: (productOrder, args) => ProductOrder.findAll({ where: args }),
};

module.exports = productOrderQuery;

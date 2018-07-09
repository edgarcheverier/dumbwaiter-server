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
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    text: {
      name: 'description',
      type: GraphQLString,
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

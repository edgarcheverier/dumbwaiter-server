const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const ProductOrderType = require('../../models/ProductOrder/ProductOrderType');
const ProductOrder = require('../../models/ProductOrder/ProductOrder');

const addProductToOrder = {
  type: ProductOrderType,
  description: 'The mutation that allows you to create a new product for an order',
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
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: async (productOrder, { productId, orderId, name, description, price }) => {
    const foundProductOrder = await ProductOrder.findOne({ productId, orderId });

    if (foundProductOrder) {
      throw new Error('ProductOrder already exists with the same name');
    }

    const createProductOrder = {
      name,
      description,
      price,
    };

    return ProductOrder.create(createProductOrder);
  },
}
const updateProductFromOrder = {
  type: ProductOrderType,
  description: 'The mutation that allows you to update an existing ProductOrder by Id',
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
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: async (productOrder, { productId, orderId, name, description, price }) => {
    const foundProductOrder = await ProductOrder.findOne({ productId, orderId });

    if (!foundProductOrder) {
      throw new Error('ProductOrder not found');
    }

    const updatedProductOrder = {
      name,
      description,
      price,
    };

    return foundProductOrder.update(updatedProductOrder);
  },
};

const deleteProductFromOrder = {
  type: ProductOrderType,
  description: 'The mutation that allows you to delete a existing product in an order',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (productOrder, { productId, orderId }) => (
    ProductOrder
      .delete()
      .where({
        productId,
        orderId,
      })
  ),
};

module.exports = {
  addProductToOrder,
  updateProductFromOrder,
  deleteProductFromOrder,
};

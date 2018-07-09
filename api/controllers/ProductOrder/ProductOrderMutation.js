const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const Order = require('../../models/Order/Order');
const { emit } = require('../Subscriptions/actions');
const ProductOrder = require('../../models/ProductOrder/ProductOrder');
const ProductOrderType = require('../../models/ProductOrder/ProductOrderType');

const addProductToOrder = {
  type: ProductOrderType,
  description:
    'The mutation that allows you to create a new product for an order',
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
  resolve: async (
    productOrder,
    { productId, orderId, name, description, price }
  ) => {
    const foundProductOrder = await ProductOrder.findOne({
      productId,
      orderId,
    });

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
};
const updateOrderProduct = {
  type: ProductOrderType,
  description:
    'The mutation that allows you to update an existing ProductOrder by Id',
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    orderId: {
      name: 'orderId',
      type: GraphQLInt,
    },
    status: {
      name: 'orderId',
      type: GraphQLString,
    },
    price: {
      name: 'price',
      type: GraphQLFloat,
    },
  },
  resolve: async (productOrder, { id, orderId, status, price }) => {
    const foundProductOrder = await ProductOrder.findById(id);

    if (!foundProductOrder) {
      throw new Error('ProductOrder not found');
    }

    const updatedProductOrder = {
      status,
      price,
    };

    await foundProductOrder.update(updatedProductOrder);
    const foundOrder = await Order.findById(orderId);
    const foundOrderProducts = await foundOrder.getProducts();

    console.log('emiting!');
    emit('onProductOrderChanged', {
      text: 'Product status changed',
      orderId: orderId,
      productOrderId: id,
      productStatus: status,
      type: 'customer',
    });

    if (
      foundOrderProducts.filter(
        el => el.status === 'ORDERED' || el.status === 'IN_PROGRESS'
      ).length === 0
    ) {
      if (foundOrder.status !== 'PENDING_PAYMENT') {
        //If everything was server we close the order
        await foundOrder.update({ status: 'CLOSED' });
      }
    }

    return foundProductOrder;
  },
};

const deleteProductFromOrder = {
  type: ProductOrderType,
  description:
    'The mutation that allows you to delete a existing product in an order',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (productOrder, { productId, orderId }) =>
    ProductOrder.delete().where({
      productId,
      orderId,
    }),
};

module.exports = {
  addProductToOrder,
  updateOrderProduct,
  deleteProductFromOrder,
};

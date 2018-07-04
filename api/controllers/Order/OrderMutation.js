const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const { protectCustomer } = require('../protectDecorator');

const { withFilter } = require('graphql-subscriptions'); // will narrow down the changes subscriptions listen to

const Order = require('../../models/Order/Order');
const { emit } = require('../Subscriptions/actions');
const Product = require('../../models/Product/Product');
const OrderType = require('../../models/Order/OrderType');
const Connection = require('../../models/Connection/Connection');
const { ON_CUSTOMER_ORDER } = require('../Subscriptions/events');
const ProductOrder = require('../../models/ProductOrder/ProductOrder');

const createOrder = {
  type: OrderType,
  description:
    'The mutation that allows you to create a new order for a connection and a user',
  args: {
    connectionId: {
      name: 'connectionId',
      type: GraphQLInt,
    },
    products: {
      name: 'products',
      type: GraphQLNonNull(GraphQLString),
    },
    price: {
      name: 'price',
      type: GraphQLFloat,
    },
    userId: {
      name: 'userId',
      type: new GraphQLList(GraphQLInt),
    },
  },
  resolve: async (order, { connectionId, products, userId, price }) => {
    let productsList = products.split(',').map(e => Number(e));
    if (productsList.length === 0) {
      throw new Error('No products sent to the order');
    }

    const productsTotals = {};
    for (var i = 0; i < productsList.length; i++) {
      const productId = productsList[i];
      if (!productsTotals.hasOwnProperty(productId)) {
        const product = await Product.findById(productId);
        productsTotals[productId] = {
          total: 1,
          price: product.price,
          productId: product.id,
        };
      } else {
        productsTotals[productId].total++;
      }
    }

    //Calculate the price and see that is the same
    let calculatedPrice = 0;
    const productsCreate = [];
    for (const prop in productsTotals) {
      calculatedPrice +=
        Number(productsTotals[prop].price) * Number(productsTotals[prop].total);
    }

    // if (calculatedPrice != price) {
    //   throw new Error(
    //     `Price has changed since the user added the product to the cart ${calculatedPrice} != ${price}`
    //   );
    // }

    //Check that the connection still active
    const connection = await Connection.findById(connectionId, {
      where: { status: 'ACTIVE' },
    });

    if (!connection) {
      throw new Error('Connection is not active anymore');
    }

    //Add products to the order
    const newOrder = await Order.create({
      status: 'PENDING_PAYMENT',
    });

    for (const prop in productsTotals) {
      for (var i = 0; i < productsTotals[prop].total; i++) {
        const newProductOrder = await ProductOrder.create({
          status: 'ORDERED',
          price: productsTotals[prop].price,
        });
        await newProductOrder.setProduct(productsTotals[prop].productId);
        await newProductOrder.save();
        await newOrder.addProducts(newProductOrder.id);
      }
    }

    //Sending message to channel
    emit('onCustomerOrder', {
      text: 'New order created',
      userId: userId,
      connectionId: connection.id,
      restaurantId: connection.restaurantId,
      orderId: newOrder.id,
      type: 'restaurant',
    });

    //Add order to the connection
    await connection.addOrder(newOrder.id);
    return newOrder;
  },
};

const updateOrder = {
  type: OrderType,
  description: 'The mutation that allows you to change the status of an order',
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    status: {
      name: 'status',
      type: GraphQLString,
    },
  },
  resolve: async (order, { id, status }) => {
    const foundOrder = await Order.findOne({
      id,
    });

    if (!foundOrder) {
      throw new Error('Order not found');
    }

    const updatedOrder = {
      status,
    };

    return foundOrder.update(updatedOrder);
  },
};

module.exports = {
  createOrder: protectCustomer(createOrder),
  updateOrder: protectCustomer(updateOrder),
};

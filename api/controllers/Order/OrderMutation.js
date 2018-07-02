const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');

const { protectCustomer } = require('../protectDecorator');

const Order = require('../../models/Order/Order');
const Product = require('../../models/Product/Product');
const OrderType = require('../../models/Order/OrderType');
const Connection = require('../../models/Connection/Connection');
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
      type: GraphQLNonNull(new GraphQLList(GraphQLInt)),
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
  resolve: async (
    order,
    { connectionId, products, userId, price }
  ) => {
    if (products.length === 0) {
      throw new Error('No products sent to the order');
    }

    const productsTotals = {};
    for (var i = 0; i < products.length; i++) {
      const productId = products[i];
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
        productsTotals[prop].price *
        productsTotals[prop].total;
    }

    console.log(calculatedPrice);

    if (calculatedPrice != price) {
      throw new Error(
        'Price has changed since the user added the product to the cart'
      );
    }

    //Check that the connection still active
    const connection = await Connection.findById(
      connectionId,
      { where: { status: 'ACTIVE' } }
    );

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
          price: productsTotals[prop].price,
        });
        await newProductOrder.setProduct(
          productsTotals[prop].productId
        );
        await newProductOrder.save();
        await newOrder.addProducts(newProductOrder.id);
      }
    }

    //Add order to the connection
    await connection.addOrder(newOrder.id);
    return newOrder;
  },
};

const updateOrder = {
  type: OrderType,
  description:
    'The mutation that allows you to change the status of an order',
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

const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');


//User querys and mutations
const userQuery = require('./User/UserQuery');
const {
  createUser,
  updateUser,
  deleteUser,
} = require('./User/UserMutation');

//Restaurant querys and mutations
const restaurantQuery = require('./Restaurant/RestaurantQuery');
const {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require('./Restaurant/RestaurantMutation');

//Product querys and mutations
const productQuery = require('./Product/ProductQuery');
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./Product/ProductMutation');

//Product querys and mutations
const productOrderQuery = require('./ProductOrder/ProductOrderQuery');
const {
  addProductToOrder,
  updateProductFromOrder,
  deleteProductFromOrder,
} = require('./ProductOrder/ProductOrderMutation');

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
  fields: () => ({
    restaurant: restaurantQuery,
    user: userQuery,
    product: productQuery,
    productOrder: productOrderQuery,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API',
  fields: () => ({
    createUser,
    updateUser,
    deleteUser,

    createProduct,
    updateProduct,
    deleteProduct,

    addProductToOrder,
    updateProductFromOrder,
    deleteProductFromOrder,

    createRestaurant,
    updateRestaurant,
    deleteRestaurant,
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;

const {
  GraphQLSchema,
  GraphQLObjectType,
} = require('graphql');

const userQuery = require('./User/UserQuery');
const {
  createUser,
  updateUser,
  deleteUser,
} = require('./User/UserMutation');
const restaurantQuery = require('./Restaurant/RestaurantQuery');
const {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
} = require('./Restaurant/RestaurantMutation');
const productQuery = require('./Product/ProductQuery');
const {
  createProduct,
  updateProduct,
  deleteProduct,
} = require('./Product/ProductMutation');

const RootQuery = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is the root query which holds all possible READ entrypoints for the GraphQL API',
  fields: () => ({
    restaurant: restaurantQuery,
    user: userQuery,
    product: productQuery,
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

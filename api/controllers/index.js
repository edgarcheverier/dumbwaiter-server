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
const { productQuery, productQueryRms } = require('./Product/ProductQuery');
const {
  createProduct,
  updateProduct,
  deleteProduct,
  addCategoryToProduct
} = require('./Product/ProductMutation');

//Category querys and mutations
const categoryQuery = require('./Category/CategoryQuery');
const {
  createCategory,
  updateCategory,
  deleteCategory,
} = require('./Category/CategoryMutation');

//Photo querys and mutations
const photoQuery = require('./Photo/PhotoQuery');
const {
  addPhoto,
  updatePhoto,
  deletePhoto,
} = require('./Photo/PhotoMutation');

//Table querys and mutations
const tableQuery = require('./Table/TableQuery');
const {
  addTable,
  updateTable,
  deleteTable,
} = require('./Table/TableMutation');

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
    productRms: productQueryRms,
    productOrder: productOrderQuery,
    photo: photoQuery,
    table: tableQuery,
    category: categoryQuery,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'rootMutation',
  description: 'This is the root mutation which holds all possible WRITE entrypoints for the GraphQL API',
  fields: () => ({
    createUser,
    updateUser,
    deleteUser,

    addPhoto,
    updatePhoto,
    deletePhoto,

    createProduct,
    updateProduct,
    deleteProduct,
    addCategoryToProduct,

    createCategory,
    updateCategory,
    deleteCategory,

    addProductToOrder,
    updateProductFromOrder,
    deleteProductFromOrder,

    createRestaurant,
    updateRestaurant,
    deleteRestaurant,

    addTable,
    updateTable,
    deleteTable,
  }),
});

const schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

module.exports = schema;

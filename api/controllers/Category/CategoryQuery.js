const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const CategoryType = require('../../models/Category/CategoryType');
const Category = require('../../models/Category/Category');

const categoryQuery = {
  type: new GraphQLList(CategoryType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
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
  resolve: (user, args) => Category.findAll({ where: args }),
};

module.exports = categoryQuery;

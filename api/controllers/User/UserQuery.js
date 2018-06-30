const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const UserType = require('../../models/User/UserType');
const User = require('../../models/User/User');

const userQuery = {
  type: new GraphQLList(UserType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
    externalLoginId: {
      name: 'externalLoginId',
      type: GraphQLInt,
    },
  },
  resolve: (user, args) => User.findAll({ where: args }),
};

module.exports = userQuery;

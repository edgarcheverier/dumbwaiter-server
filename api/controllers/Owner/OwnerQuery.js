const {
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const OwnerType = require('../../models/Owner/OwnerType');
const Owner = require('../../models/Owner/Owner');

const ownerQuery = {
  type: new GraphQLList(OwnerType),
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    lastname: {
      name: 'lastname',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    }
  },
  resolve: (owner, args) => Owner.findAll({ where: args }),
};

module.exports = ownerQuery;

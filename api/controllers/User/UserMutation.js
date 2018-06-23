const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const UserType = require('../../models/User/UserType');
const User = require('../../models/User/User');

const createUser = {
  type: UserType,
  description: 'The mutation that allows you to create a new User',
  args: {
    name: {
      name: 'name',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (user, { name, email }) => {
    const foundUser = await User.findBy(email);

    if (foundUser) {
      throw new Error('User exists with the same email');
    }

    const createUser = {
      name,
      email,
    };

    return foundUser.create(createUser);
  },
};

const updateUser = {
  type: UserType,
  description: 'The mutation that allows you to update an existing User by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
  },
  resolve: async (user, { id, name, email }) => {
    const foundUser = await User.findById(id);

    if (!foundUser) {
      throw new Error('User not found');
    }

    const updatedUser = merge(foundUser, {
      name,
      email,
    });

    return foundUser.update(updatedUser);
  },
};

const deleteUser = {
  type: UserType,
  description: 'The mutation that allows you to delete a existing User by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (user, { id }) => (
    User
      .delete()
      .where({
        id,
      })
  ),
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};

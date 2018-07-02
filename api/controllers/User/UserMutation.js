const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const UserType = require('../../models/User/UserType');
const User = require('../../models/User/User');
const Photo = require('../../models/Photo/Photo');

const createUser = {
  type: UserType,
  description:
    'The mutation that allows you to create a new User',
  args: {
    name: {
      name: 'name',
      type: GraphQLString,
    },
    type: {
      name: 'type',
      type: new GraphQLNonNull(GraphQLString),
    },
    externalLoginId: {
      name: 'externalLoginId',
      type: GraphQLString,
    },
    password: {
      name: 'password',
      type: new GraphQLNonNull(GraphQLString),
    },
    photo: {
      name: 'type',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (
    user,
    { name, email, type, photo, password, externalLoginId }
  ) => {
    const foundUser = await User.findOne({
      where: { email },
    });

    if (foundUser && email !== '') {
      throw new Error('User exists with the same email');
    }

    const createUser = {
      name,
      email,
      type,
      password,
      externalLoginId,
    };

    const newUser = await User.create(createUser);

    if (photo) {
      Photo.create({
        url: photo,
        type: 'USER',
        externalId: newUser.id,
      });
    }

    return newUser;
  },
};

const updateUser = {
  type: UserType,
  description:
    'The mutation that allows you to update an existing User by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    externalLoginId: {
      name: 'externalLoginId',
      type: GraphQLString,
    },
    email: {
      name: 'email',
      type: GraphQLString,
    },
  },
  resolve: async (
    user,
    { id, name, email, externalLoginId }
  ) => {
    const foundUser = await User.findById(id);

    if (!foundUser) {
      throw new Error('User not found');
    }

    const updatedUser = merge(foundUser, {
      name,
      email,
      externalLoginId,
    });

    return foundUser.update(updatedUser);
  },
};

const deleteUser = {
  type: UserType,
  description:
    'The mutation that allows you to delete a existing User by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (user, { id }) =>
    User.delete().where({
      id,
    }),
};

module.exports = {
  createUser,
  updateUser,
  deleteUser,
};

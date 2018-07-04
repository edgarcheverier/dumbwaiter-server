const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const Restaurant = require('../../models/Restaurant/Restaurant');
const OwnerType = require('../../models/Owner/OwnerType');
const Owner = require('../../models/Owner/Owner');
const Photo = require('../../models/Photo/Photo');

const createOwner = {
  type: OwnerType,
  description:
    'The mutation that allows you to create a new Owner',
  args: {
    name: {
      name: 'name',
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
    restaurantId: {
      name: 'restaurantId',
      type: GraphQLInt,
    },
    restaurantName: {
      name: 'restaurantName',
      type: GraphQLInt,
    },
    latitude: {
      name: 'latitude',
      type: GraphQLString,
    },
    longitude: {
      name: 'longitude',
      type: GraphQLString,
    },
    address: {
      name: 'address',
      type: GraphQLString,
    },
  },
  resolve: async (
    owner,
    { name, email, photo, password, restaurantId }
  ) => {
    const foundOwner = await Owner.findOne({
      where: { email },
    });

    if (foundOwner && email !== '') {
      throw new Error('Owner exists with the same email');
    }

    const createOwner = {
      name,
      email,
      password,
    };

    const newOwner = await Owner.create(createOwner);

    if (restaurantId) {
      const foundRestaurant = await Restaurant.findById(
        restaurantId
      );
      if (foundRestaurant) {
        Restaurant.update(
          { ownerId: newOwner.id },
          { where: { id: restaurantId } }
        );
      }
    }

    if (photo) {
      Photo.create({
        url: photo,
        type: 'OWNER',
        externalId: newOwner.id,
      });
    }

    return newOwner;
  },
};

const updateOwner = {
  type: OwnerType,
  description:
    'The mutation that allows you to update an existing Owner by Id',
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
    owner,
    { id, name, email, externalLoginId }
  ) => {
    const foundOwner = await Owner.findById(id);

    if (!foundOwner) {
      throw new Error('Owner not found');
    }

    const updatedOwner = merge(foundOwner, {
      name,
      email,
      externalLoginId,
    });

    return foundOwner.update(updatedOwner);
  },
};

const deleteOwner = {
  type: OwnerType,
  description:
    'The mutation that allows you to delete a existing Owner by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (owner, { id }) =>
    Owner.delete().where({
      id,
    }),
};

module.exports = {
  createOwner,
  updateOwner,
  deleteOwner,
};

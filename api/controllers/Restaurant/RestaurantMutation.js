const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const RestaurantType = require('../../models/Restaurant/RestaurantType');
const Restaurant = require('../../models/Restaurant/Restaurant');

const createRestaurant = {
  type: RestaurantType,
  description: 'The mutation that allows you to create a new restaurant',
  args: {
    name: {
      name: 'name',
      type: GraphQLString,
    },
    description: {
      name: 'description',
      type: GraphQLString,
    },
    latitude: {
      name: 'latitude',
      type: GraphQLString,
    },
    longitude: {
      name: 'longitude',
      type: GraphQLString,
    },
  },
  resolve: async (restaurant, { name, description, latitude, longitude }) => {
    const foundRestaurant = await Restaurant.findBy(name);

    if (foundRestaurant) {
      throw new Error('Restaurant already exists with the same name');
    }

    const createRestaurant = {
      name,
      description,
      latitude,
      longitude,
    };

    return foundRestaurant.create(createRestaurant);
  },
}
const updateRestaurant = {
  type: RestaurantType,
  description: 'The mutation that allows you to update an existing Restaurant by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    description: {
      name: 'description',
      type: GraphQLString,
    },
    latitude: {
      name: 'latitude',
      type: GraphQLString,
    },
    longitude: {
      name: 'longitude',
      type: GraphQLString,
    },
  },
  resolve: async (restaurant, { id, name, description, latitude, longitude }) => {
    const foundRestaurant = await Restaurant.findById(id);

    if (!foundRestaurant) {
      throw new Error('Restaurant not found');
    }

    const updatedRestaurant = merge(foundRestaurant, {
      name,
      description,
      latitude,
      longitude,
    });

    return foundRestaurant.update(updatedRestaurant);
  },
};

const deleteRestaurant = {
  type: RestaurantType,
  description: 'The mutation that allows you to delete a existing Restaurant by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (restaurant, { id }) => (
    Restaurant
      .delete()
      .where({
        id,
      })
  ),
};

module.exports = {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};

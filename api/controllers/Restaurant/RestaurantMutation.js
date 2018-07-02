const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');

const RestaurantType = require('../../models/Restaurant/RestaurantType');
const Restaurant = require('../../models/Restaurant/Restaurant');
const Photo = require('../../models/Photo/Photo');

const createRestaurant = {
  type: RestaurantType,
  description:
    'The mutation that allows you to create a new restaurant',
  args: {
    name: {
      name: 'name',
      type: GraphQLString,
    },
    type: {
      name: 'type',
      type: GraphQLString,
    },
    photo: {
      name: 'photo',
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
  resolve: async (
    restaurant,
    { name, description, latitude, longitude, type, photo }
  ) => {
    const foundRestaurant = await Restaurant.findOne({
      name,
    });

    if (foundRestaurant) {
      throw new Error(
        'Restaurant already exists with the same name'
      );
    }

    const createRestaurant = {
      name,
      description,
      latitude,
      longitude,
      type,
    };

    const newRestaurant = await Restaurant.create(
      createRestaurant
    );

    if (photo) {
      Photo.create({
        url: photo,
        type: 'RESTAURANT',
        externalId: newRestaurant.id,
      });
    }

    return newRestaurant;
  },
};
const updateRestaurant = {
  type: RestaurantType,
  description:
    'The mutation that allows you to update an existing Restaurant by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    type: {
      name: 'type',
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
  resolve: async (
    restaurant,
    { id, name, description, latitude, longitude, type }
  ) => {
    const foundRestaurant = await Restaurant.findById(id);

    if (!foundRestaurant) {
      throw new Error('Restaurant not found');
    }

    const updatedRestaurant = {
      name,
      description,
      latitude,
      longitude,
      type,
    };

    return foundRestaurant.update(updatedRestaurant);
  },
};

const deleteRestaurant = {
  type: RestaurantType,
  description:
    'The mutation that allows you to delete a existing Restaurant by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (restaurant, { id }) =>
    Restaurant.delete().where({
      id,
    }),
};

module.exports = {
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
};

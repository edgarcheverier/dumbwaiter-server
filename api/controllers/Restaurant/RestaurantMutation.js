const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const RestaurantType = require('../../models/Restaurant/RestaurantType');
const Restaurant = require('../../models/Restaurant/Restaurant');

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
  },
  resolve: async (user, { id, username, email }) => {
    const foundRestaurant = await Restaurant.findById(id);

    if (!foundRestaurant) {
      throw new Error('Restaurant not found');
    }

    const updatedRestaurant = merge(foundRestaurant, {
      username,
      email,
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
  resolve: (user, { id }) => (
    Restaurant
      .delete()
      .where({
        id,
      })
  ),
};

module.exports = {
  updateRestaurant,
  deleteRestaurant,
};

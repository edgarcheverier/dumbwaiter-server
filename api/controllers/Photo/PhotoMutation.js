const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const PhotoType = require('../../models/Photo/PhotoType');
const Photo = require('../../models/Photo/Photo');

const addPhoto = {
  type: PhotoType,
  description: 'The mutation that allows you to create a new photo for a entity',
  args: {
    externalId: {
      name: 'externalId',
      type: GraphQLInt,
    },
    order: {
      name: 'order',
      type: GraphQLInt,
    },
    type: {
      name: 'type',
      type: GraphQLString,
    },
    url: {
      name: 'url',
      type: GraphQLString,
    },
  },
  resolve: async (photo, { url, type, externalId }) => {
    const foundPhoto = await Photo.findOne({ url });

    if (foundPhoto) {
      throw new Error('Photo already exists with the same url');
    }

    const createPhoto = {
      url,
      type,
      externalId,
    };

    return Photo.create(createPhoto);
  },
}

const updatePhoto = {
  type: PhotoType,
  description: 'The mutation that allows you to update an existing Photo by Id',
  args: {
    externalId: {
      name: 'externalId',
      type: GraphQLInt,
    },
    order: {
      name: 'order',
      type: GraphQLInt,
    },
    type: {
      name: 'type',
      type: GraphQLString,
    },
    url: {
      name: 'url',
      type: GraphQLInt,
    },
  },
  resolve: async (photo, { url, order, type, externalId }) => {
    const foundPhoto = await Photo.findOne({ url, order, externalId, type, order });

    if (!foundPhoto) {
      throw new Error('Photo not found');
    }

    const updatedPhoto = {
      url,
      order
    };

    return foundPhoto.update(updatedPhoto);
  },
};

const deletePhoto = {
  type: PhotoType,
  description: 'The mutation that allows you to delete a existing product in an order',
  args: {
    externalId: {
      name: 'externalId',
      type: GraphQLInt,
    },
    type: {
      name: 'type',
      type: GraphQLString,
    },
    url: {
      name: 'url',
      type: GraphQLInt,
    },
  },
  resolve: (photo, { externalId, type, url }) => (
    Photo
      .delete()
      .where({
        externalId,
        type,
        url,
      })
  ),
};

module.exports = {
  addPhoto,
  updatePhoto,
  deletePhoto,
};

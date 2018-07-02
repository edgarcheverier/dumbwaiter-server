const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const randomstring = require('randomstring');

const {
  protectRMSRestaurant,
} = require('../protectDecorator');

const TableCodeType = require('../../models/TableCode/TableCodeType');
const TableCode = require('../../models/TableCode/TableCode');

const addTableCode = {
  type: TableCodeType,
  description:
    'The mutation that allows you to create a new TableCode',
  args: {
    code: {
      name: 'code',
      type: GraphQLNonNull(GraphQLString),
    },
    restaurantId: {
      name: 'restaurantId',
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (tableCode, { code, restaurantId }) => {
    const foundTableCode = await TableCode.findOne({
      where: { code, restaurantId },
    });

    if (foundTableCode) {
      throw new Error(
        `TableCode exists with the same code ${code} in this restaurant`
      );
    }

    const createTableCode = {
      code,
      restaurantId,
    };

    return TableCode.create(createTableCode);
  },
};

const updateTableCode = {
  type: TableCodeType,
  description:
    'The mutation that allows you to update an existing TableCode by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    code: {
      name: 'code',
      type: GraphQLString,
    },
  },
  resolve: async (tableCode, { id, code }) => {
    const foundTableCode = await TableCode.findById(id);

    if (!foundTableCode) {
      throw new Error('TableCode not found');
    }

    const updatedTableCode = merge(foundTableCode, {
      code,
    });

    return foundTableCode.update(updatedTableCode);
  },
};

const deleteTableCode = {
  type: TableCodeType,
  description:
    'The mutation that allows you to delete a existing TableCode by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (tableCode, { id }) =>
    TableCode.delete().where({
      id,
    }),
};

module.exports = {
  addTableCode: protectRMSRestaurant(addTableCode),
  updateTableCode: protectRMSRestaurant(updateTableCode),
  deleteTableCode: protectRMSRestaurant(deleteTableCode),
};

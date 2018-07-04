const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLFloat,
} = require('graphql');
const randomstring = require('randomstring');

const { protectRMSRestaurant } = require('../protectDecorator');

const TableType = require('../../models/Table/TableType');
const Table = require('../../models/Table/Table');
const TableCode = require('../../models/TableCode/TableCode');
const Restaurant = require('../../models/Restaurant/Restaurant');

const addTable = {
  type: TableType,
  description: 'The mutation that allows you to create a new Table',
  args: {
    name: {
      name: 'name',
      type: GraphQLNonNull(GraphQLString),
    },
    restaurantId: {
      name: 'restaurantId',
      type: GraphQLNonNull(GraphQLString),
    },
    width: {
      name: 'width',
      type: GraphQLFloat,
    },
    height: {
      name: 'height',
      type: GraphQLFloat,
    },
  },
  resolve: async (table, { name, restaurantId, width, height }) => {
    const foundTable = await Table.findOne({
      where: { name, restaurantId },
    });

    if (foundTable) {
      throw new Error(
        `Table exists with the same name ${name} in this restaurant`
      );
    }

    const createTable = {
      name,
      restaurantId,
      width,
      height,
    };

    return Table.create(createTable);
  },
};

const updateTable = {
  type: TableType,
  description: 'The mutation that allows you to update an existing Table by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    width: {
      name: 'width',
      type: GraphQLFloat,
    },
    height: {
      name: 'height',
      type: GraphQLFloat,
    },
    positionX: {
      name: 'positionX',
      type: GraphQLFloat,
    },
    positionY: {
      name: 'positionY',
      type: GraphQLFloat,
    },
  },
  resolve: async (table, { id, name, width, height, positionX, positionY }) => {
    const foundTable = await Table.findById(id);

    if (!foundTable) {
      throw new Error('Table not found');
    }

    const updatedTable = {
      name,
      width,
      height,
      positionX,
      positionY,
    };

    return foundTable.update(updatedTable);
  },
};

const deleteTable = {
  type: TableType,
  description: 'The mutation that allows you to delete a existing Table by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: async (table, { id }) => {
    const foundTable = await Table.findById(id);
    if (foundTable) {
      await foundTable.destroy();
    }
    return { id };
  },
};

const generateTableCode = {
  type: TableType,
  description: 'The mutation that allows you to create a new table code',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLString),
    },
    restaurantId: {
      name: 'id',
      type: GraphQLInt,
    },
  },
  resolve: async (table, { id, restaurantId }) => {
    let code = '';

    const foundTable = await Table.findById(id);
    if (!foundTable) {
      throw new Error('Table does not exist');
    }

    //Check that the table is from the restaurant that is asking for the code
    if (restaurantId !== foundTable.restaurantId) {
      throw new Error('Table is not from this restaurant');
    }

    //Check if a active connection already exists
    const activeCode = await foundTable.getCodes({
      where: { status: ' ACTIVE' },
    });

    if (!code.length) {
      code = randomstring.generate({
        length: 4,
        charset: 'ABCDEFG1234567890',
      });
      const tableCode = await TableCode.create({
        code,
        status: 'PENDING_CONNECTION',
      });
      await foundTable.addCode(tableCode);
    } else {
      code = activeCode.code;
    }
    //Return new code
    return foundTable;
  },
};

module.exports = {
  addTable,
  updateTable,
  deleteTable,
  generateTableCode: protectRMSRestaurant(generateTableCode),
};

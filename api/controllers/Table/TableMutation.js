const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const randomstring = require('randomstring');

const {
  protectRMSRestaurant,
} = require('../protectDecorator');

const TableType = require('../../models/Table/TableType');
const Table = require('../../models/Table/Table');
const TableCode = require('../../models/TableCode/TableCode');
const Restaurant = require('../../models/Restaurant/Restaurant');

const addTable = {
  type: TableType,
  description:
    'The mutation that allows you to create a new Table',
  args: {
    name: {
      name: 'name',
      type: GraphQLNonNull(GraphQLString),
    },
    restaurantId: {
      name: 'restaurantId',
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (table, { name, restaurantId }) => {
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
    };

    return Table.create(createTable);
  },
};

const updateTable = {
  type: TableType,
  description:
    'The mutation that allows you to update an existing Table by Id',
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
  resolve: async (table, { id, name }) => {
    const foundTable = await Table.findById(id);

    if (!foundTable) {
      throw new Error('Table not found');
    }

    const updatedTable = merge(foundTable, {
      name,
    });

    return foundTable.update(updatedTable);
  },
};

const deleteTable = {
  type: TableType,
  description:
    'The mutation that allows you to delete a existing Table by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (table, { id }) =>
    Table.delete().where({
      id,
    }),
};

const generateTableCode = {
  type: TableType,
  description:
    'The mutation that allows you to create a new table code',
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
    let msg = '';

    const foundTable = await Table.findById(id);
    console.log('TABLE ID', id);
    console.log(foundTable);
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
      msg = 'New code generated';
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
      msg = 'Active code already exists for this table';
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
  generateTableCode: protectRMSRestaurant(
    generateTableCode
  ),
};

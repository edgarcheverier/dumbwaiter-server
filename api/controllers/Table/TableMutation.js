const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const TableType = require('../../models/Table/TableType');
const Table = require('../../models/Table/Table');

const createTable = {
  type: TableType,
  description: 'The mutation that allows you to create a new Table',
  args: {
    Tablename: {
      name: 'name',
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (Table, { name, restaurantId }) => {
    const foundTable = await Table.findOne({name, restaurantId});

    if (foundTable) {
      throw new Error('Table exists with the same name in this restaurant');
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
  },
  resolve: async (Table, { id, name }) => {
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
  description: 'The mutation that allows you to delete a existing Table by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (Table, { id }) => (
    Table
      .delete()
      .where({
        id,
      })
  ),
};

module.exports = {
  createTable,
  updateTable,
  deleteTable,
};

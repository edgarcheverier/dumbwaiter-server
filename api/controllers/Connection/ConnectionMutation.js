const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
} = require('graphql');

const { protectCustomer } = require('../protectDecorator');

const User = require('../../models/User/User');
const Table = require('../../models/Table/Table');
const TableCode = require('../../models/TableCode/TableCode');
const Connection = require('../../models/Connection/Connection');
const ConnectionType = require('../../models/Connection/ConnectionType');

const generateCodeForTable = {};

const addConnection = {
  type: ConnectionType,
  description:
    'The mutation that allows you to create a new connection for a entity',
  args: {
    userId: {
      name: 'userId',
      type: GraphQLInt,
    },
    code: {
      name: 'code',
      type: GraphQLString,
    },
    restaurantId: {
      name: 'restaurantId',
      type: GraphQLInt,
    },
  },
  resolve: async (
    connection,
    { userId, restaurantId, code }
  ) => {
    const foundTable = await Table.findOne({
      where: { restaurantId },
      include: [
        {
          model: TableCode,
          as: 'Codes',
          where: {
            code,
          },
        },
      ],
    });

    if (!foundTable) {
      throw new Error(
        'The code is not valid for this table'
      );
    }

    if (foundTable.restaurantId !== restaurantId) {
      throw new Error(
        'This table is not from this restaurant'
      );
    }

    //Check if a connection exists with this code and create if not
    let currentConnection = await Connection.findOne({
      where: { tableId: foundTable.id, code },
    });

    if (!currentConnection) {
      currentConnection = await Connection.create({
        tableId: foundTable.id,
        restaurantId: restaurantId,
        code,
        userId,
        status: 'ACTIVE',
      });

      //Check if currentConnection is active
    } else if (currentConnection.status !== 'ACTIVE') {
      throw new Error('Connection is not active anymore');
    }

    const foundUser = await currentConnection.getUsers({
      where: { id: userId },
    });

    //Check if the user already is in this Connection
    if (foundUser.length > 0) {
      throw new Error('User is already connected');
    } else {
      const user = await User.findOne({
        where: { id: userId },
      });
      //Connect user to table
      await currentConnection.addUser(user.id);
      return currentConnection;
    }
  },
};

const updateConnection = {
  type: ConnectionType,
  description:
    'The mutation that allows you to create connect an user with a table from a restaurant',
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
  resolve: async (
    connection,
    { url, order, type, externalId }
  ) => {
    const foundConnection = await Connection.findOne({
      url,
      order,
      externalId,
      type,
      order,
    });

    if (!foundConnection) {
      throw new Error('Connection not found');
    }

    const updatedConnection = {
      url,
      order,
    };

    return foundConnection.update(updatedConnection);
  },
};

const deleteConnection = {
  type: ConnectionType,
  description:
    'The mutation that allows you to delete a existing product in an order',
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
  resolve: (connection, { externalId, type, url }) =>
    Connection.delete().where({
      externalId,
      type,
      url,
    }),
};

const closeConnection = {
  type: ConnectionType,
  description:
    'The mutation that allows you to close a existing connection only if all the orders are finished ',
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
  },
  resolve: (connection, { id }) => {
    //TODO
    //Check if all the orders are finished
    Connection.update({
      status: 'CLOSED',
    }).where({
      id,
    });
  },
};

module.exports = {
  addConnection: protectCustomer(addConnection),
  closeConnection,
  updateConnection,
  deleteConnection,
};

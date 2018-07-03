const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} = require('graphql');

const TableCodeType = require('../TableCode/TableCodeType');
const Table = require('../Table/Table');

const TableType = new GraphQLObjectType({
  name: 'Table',
  description:
    'This represents each table within the restaurant',
  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: table => table.id,
    },
    name: {
      type: GraphQLString,
      resolve: table => table.name,
    },
    positionX: {
      type: GraphQLInt,
      resolve: table => table.positionX,
    },
    positionY: {
      type: GraphQLInt,
      resolve: table => table.positionY,
    },
    activeCode: {
      type: GraphQLList(TableCodeType),
      resolve: async table => {
        return await table
          .getCodes({
            limit: 1,
            offset: 0,
            order: [['createdAt', 'DESC']],
            where: {
              status: 'PENDING_CONNECTION',
            },
          })
          .then(res => {
            console.log(res);
            return res;
          });
      },
    },
  }),
});

module.exports = TableType;

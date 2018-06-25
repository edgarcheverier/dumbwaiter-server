const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const ProductType = require('../../models/Product/ProductType');
const Product = require('../../models/Product/Product');

const createProduct = {
  type: ProductType,
  description: 'The mutation that allows you to create a new product',
  args: {
    name: {
      name: 'name',
      type: GraphQLString,
    },
    description: {
      name: 'description',
      type: GraphQLString,
    },
    price: {
      name: 'price',
      type: GraphQLFloat,
    },
    createdAt: {
      name: 'createdAt',
      type: GraphQLString,
    },
    updatedAt: {
      name: 'updatedAt',
      type: GraphQLString,
    },
  },
  resolve: async (product, { name, description, price }) => {
    const foundProduct = await Product.findOne({name});

    if (foundProduct) {
      throw new Error('Product already exists with the same name');
    }

    const createProduct = {
      name,
      description,
      price,
    };

    return Product.create(createProduct);
  },
}
const updateProduct = {
  type: ProductType,
  description: 'The mutation that allows you to update an existing Product by Id',
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
    price: {
      name: 'price',
      type: GraphQLFloat,
    }
  },
  resolve: async (product, { id, name, description, price }) => {
    const foundProduct = await Product.findById(id);

    if (!foundProduct) {
      throw new Error('Product not found');
    }

    const updatedProduct = merge(foundProduct, {
      name,
      description,
      price,
    });

    return foundProduct.update(updatedProduct);
  },
};

const deleteProduct = {
  type: ProductType,
  description: 'The mutation that allows you to delete a existing Product by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (product, { id }) => (
    Product
      .delete()
      .where({
        id,
      })
  ),
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
};

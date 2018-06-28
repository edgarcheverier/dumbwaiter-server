const {
  GraphQLString,
  GraphQLInt,
  GraphQLFloat,
  GraphQLList,
  GraphQLNonNull,
  GraphQLInputObjectType,
} = require('graphql');

const { protectRMSRestaurant } = require('../protectDecorator');

const ProductType = require('../../models/Product/ProductType');
const Product = require('../../models/Product/Product');
const Category = require('../../models/Category/Category');
const Photo = require('../../models/Photo/Photo');

const categoriesInputType = new GraphQLInputObjectType({
  name: 'categoriesInput',
  fields: {
    name: {
      type: new GraphQLNonNull(GraphQLString)
    },
  }
});

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
      type: GraphQLString,
    },
    photo: {
      name: 'photo',
      type: GraphQLString,
    },
    restaurantId: {
      name: 'resturantId',
      type: GraphQLInt,
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
  resolve: async (product, { name, description, price, photo, restaurantId }) => {
    const foundProduct = await Product.findOne({ where: { name, restaurantId } });

    if (foundProduct) {
      throw new Error('Product already exists with the same name');
    }

    if (!name) {
      throw new Error('Name is mandatory');
    }

    const createProduct = {
      name,
      description,
      price: parseFloat(price),
      restaurantId
    };

    const newProduct = await Product.create(createProduct);

    if(photo) {
        Photo.create({
          url: photo,
          type: 'PRODUCT',
          externalId: newProduct.id
        })
    }

    return newProduct;
  },
}
const updateProduct = {
  type: ProductType,
  description: 'The mutation that allows you to update an existing Product by Id',
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    resturantId: {
      name: 'resturantId',
      type: GraphQLInt,
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
  resolve: async (product, { id, name, description, price, restaurantId, categories }) => {
    const foundProduct = await Product.findOne({ where: { id } });

    if (!foundProduct) {
      throw new Error('Product not found');
    }

    const updatedProduct = {
      name,
      description,
      price: parseFloat(price),
      restaurantId
    };

    return foundProduct.update(updatedProduct);
  },
};

const addCategoryToProduct = {
  type: ProductType,
  description: 'The mutation that allows you to update an existing Product by Id',
  args: {
    id: {
      name: 'id',
      type: GraphQLInt,
    },
    name: {
      name: 'name',
      type: GraphQLString,
    },
    categoryName: {
      name: 'categoryName',
      type: GraphQLString,
    },
  },
  resolve: async (product, { id, categoryName, name }) => {
    let foundProduct = await Product.findOne({where: {id}});

    //TODO remove name search (only while loading mocks)
    if(!foundProduct) foundProduct = await Product.findOne({where: {name}});

    if (!foundProduct) {
      throw new Error(`Product not found with id ${id}`);
    }

    const foundCategory = await Category.findOne( {
      where: { name: categoryName }
    });

    if (!foundCategory) {
      throw new Error(`Category not found with name ${categoryName}`);
    }
    const categories = await foundProduct.getCategories();
    await foundProduct.addCategory(foundCategory.id)

    return foundProduct;
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
  createProduct: protectRMSRestaurant(createProduct),
  updateProduct: protectRMSRestaurant(updateProduct),
  deleteProduct: protectRMSRestaurant(deleteProduct),
  addCategoryToProduct: protectRMSRestaurant(addCategoryToProduct),
};

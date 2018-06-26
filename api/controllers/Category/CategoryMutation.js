const {
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
} = require('graphql');
const merge = require('lodash.merge');

const CategoryType = require('../../models/Category/CategoryType');
const Category = require('../../models/Category/Category');

const createCategory = {
  type: CategoryType,
  description: 'The mutation that allows you to create a new Category',
  args: {
    name: {
      name: 'name',
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (category, { name }) => {
    const foundCategory = await Category.findOne({ name });

    if (foundCategory) {
      throw new Error('Category exists with the same name');
    }

    const createCategory = {
      name,
    };

    return Category.create(createCategory);
  },
};

const updateCategory = {
  type: CategoryType,
  description: 'The mutation that allows you to update an existing Category by Id',
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
  resolve: async (Category, { id, name }) => {
    const foundCategory = await Category.findById(id);

    if (!foundCategory) {
      throw new Error('Category not found');
    }

    const updatedCategory = {
      name,
    };

    return foundCategory.update(updatedCategory);
  },
};

const deleteCategory = {
  type: CategoryType,
  description: 'The mutation that allows you to delete a existing Category by Id',
  args: {
    id: {
      name: 'id',
      type: new GraphQLNonNull(GraphQLInt),
    },
  },
  resolve: (Category, { id }) => (
    Category
      .delete()
      .where({
        id,
      })
  ),
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
};

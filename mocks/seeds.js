const users = require('./users');
const restaurants = require('./restaurants');
const categories = require('./categories');
const tables = require('./tables');
const drinks = require('./drinks');
const food = require('./food');

const execute = {
  CREATE_PRODUCT_CATEGORIES: false,
  CREATE_USERS: false,
  CREATE_RESTAURANTS: true,
  CREATE_RESTAURANT_TABLES: false,
  CREATE_PRODUCT_CATEGORIES: true,
  CREATE_RESTAURANT_PRODUCTS: true,
  ADD_CATEGORIES_TO_PRODUCTS: true,
}

const QUERYS = {
  CREATE_USERS: [
    ...users.map(user => {
      return `
      mutation {
        createUser(
          name: "${user.name}"
          email: "${user.email}"
          type: "${user.type}"
          photo: "${user.photo}"
        ) {
          id
        }
      }
      `
    })
  ],
  CREATE_RESTAURANTS: [
    ...restaurants.map(restaurant => {
      return `
      mutation {
        createRestaurant(
          name: "${restaurant.name}"
          description: "${restaurant.description}"
          latitude: "${restaurant.latitude}"
          longitude: "${restaurant.longitude}"
          photo: "${restaurant.photo}"
        ) {
          id
        }
      }
      `
    })
  ],
  CREATE_RESTAURANT_TABLES: [
    ...tables.map(table => {
      return `
      mutation {
      addTable(
          name: "${table.name}"
          restaurantId: "${table.restaurantId}"
        ) {
          id
        }
      }
      `
    })
  ],
  CREATE_PRODUCT_CATEGORIES: [
    ...categories.map(category => {
      return `
      mutation {
      createCategory(
          name: "${category.name}"
        ) {
          id
        }
      }
      `
    })

  ],
  CREATE_RESTAURANT_PRODUCTS: [
    ...[...drinks, ...food].map(product => {
    return `
    mutation {
      createProduct(
        name: "${product.name}"
        description: "${product.description}"
        price: "${product.price}"
        photo: "${(product.photo ? product.photo : "https://www.prikentik.be/media/wysiwyg/streekbieren/PrikenTik-bier.jpg")}"
      ) {
        id
      }
    }
    `
    })
  ],
  ADD_CATEGORIES_TO_PRODUCTS: [
    ...[...drinks, ...food].map(product => {
    return `
    mutation {
      updateProduct(
        name: "${product.name}"
      ) {
        id
      }
    }
    `
    })
  ]
}

const schema = require('../api/controllers');
const {graphql} = require('graphql');

(async() => {
  for(const group in QUERYS) {
    console.log(`Loading data ${group}...`);
    if(execute[group] !== true ) continue;

    await QUERYS[group].forEach(async (query) => {
      console.log(query);
       await graphql(schema, query).then(result => {
         if(result.errors) console.log('Error loading data', result.errors);
       });
    });
  }
})();

const owners = require('./owners');
const restaurants = require('./restaurants');
const categories = require('./categories');
const tables = require('./tables');
const drinks = require('./drinks');
const food = require('./food');

const execute = {
  CREATE_PRODUCT_CATEGORIES: true,
  CREATE_OWNERS: true,
  CREATE_RESTAURANTS: true,
  CREATE_RESTAURANT_TABLES: true,
  CREATE_RESTAURANT_PRODUCTS_1: true,
  CREATE_RESTAURANT_PRODUCTS_2: true,
  CREATE_RESTAURANT_PRODUCTS_3: true,
}

const QUERYS = {
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
  CREATE_OWNERS: [
    ...owners.map(user => {
      return `
      mutation {
        createOwner(
          name: "${user.name}"
          email: "${user.email}"
          password: "${user.password}"
          photo: "${user.photo}"
          restaurantId: ${user.restaurantId}
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
  CREATE_RESTAURANT_PRODUCTS_1: [
    ...[...drinks, ...food].map(product => {
    return `
    mutation {
      createProduct(
        name: "${product.name}"
        description: "${product.description}"
        price: "${product.price}"
        photo: "${(product.photo ? product.photo : "https://www.prikentik.be/media/wysiwyg/streekbieren/PrikenTik-bier.jpg")}"
        restaurantId: 1
      ) {
        id
      }
    }
    `
    })
  ],
  CREATE_RESTAURANT_PRODUCTS_2: [
    ...[...drinks, ...food].map(product => {
    return `
    mutation {
      createProduct(
        name: "${product.name}"
        description: "${product.description}"
        price: "${product.price}"
        photo: "${(product.photo ? product.photo : "https://www.prikentik.be/media/wysiwyg/streekbieren/PrikenTik-bier.jpg")}"
        restaurantId: 2
      ) {
        id
      }
    }
    `
    })
  ],
  CREATE_RESTAURANT_PRODUCTS_3: [
    ...[...drinks, ...food].map(product => {
    return `
    mutation {
      createProduct(
        name: "${product.name}"
        description: "${product.description}"
        price: "${product.price}"
        photo: "${(product.photo ? product.photo : "https://www.prikentik.be/media/wysiwyg/streekbieren/PrikenTik-bier.jpg")}"
        restaurantId: 3
      ) {
        id
      }
    }
    `
    })
  ],
}

const schema = require('../api/controllers');
const {graphql} = require('graphql');

(async() => {
  for(const group in QUERYS) {
    console.log(`Loading data ${group}...`);
    if(execute[group] !== true ) continue;
    await QUERYS[group].forEach(async (querys) => {
       if(!Array.isArray(querys)) {
         querys = [querys];
       }
       for (var i = 0; i < querys.length; i++) {
         await graphql(schema, querys[i]).then(result => {
           if(result.errors) console.log('Error loading data', result.errors);
         });
       }

    });
  }
})();

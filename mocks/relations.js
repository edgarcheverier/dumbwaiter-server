const drinks = require('./drinks');
const food = require('./food');

const execute = {
  ADD_CATEGORIES_TO_PRODUCTS: true,
}

const QUERYS = {
  ADD_CATEGORIES_TO_PRODUCTS: [
    ...[...drinks, ...food].map(product => {
      const categories = product.categories;
      const result = [...categories].map(category => {
        return `
        mutation {
          addCategoryToProduct(
            name: "${product.name}"
            categoryName: "${category}"
          ) {
            name
          }
        }
        `
      });
      return [...result];
    })
  ]
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

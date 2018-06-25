const users = require('./users');

module.exports = {
  CREATE_USERS: [
    `
    mutation {
      createUser(
        name: "Cerveza San Miguel"
        description: "San Miguel Especial Fue la primera cerveza especial en España y se ha convertido en la marca española de mayor exportación, con reconocido éxito nacional e internacional por su calidad y buen sabor. Una cerveza, especial por su color amarillo oro brillante, que al probarla destaca por su equilibrio, su frescura y su ligero amargor. Sus levaduras y maltas le dan una serie de matices al cuerpo y aroma que le otorgan un perfecto equilibrio entre suave y amargo."
        price: 2.5
        photo: "https://www.prikentik.be/media/wysiwyg/streekbieren/PrikenTik-bier.jpg",
        categories: [
          1,2
        ]
      )
    }
    `
  ],
  CREATE_RESTAURANTS: [

  ],
  CREATE_RESTAURANT_TABLES: [

  ],
  CREATE_CATEGORIES: [

  ],
  CREATE_PRODUCTS: [
    `
    mutation {
      createProduct(
        name: "Cerveza San Miguel"
        description: "San Miguel Especial Fue la primera cerveza especial en España y se ha convertido en la marca española de mayor exportación, con reconocido éxito nacional e internacional por su calidad y buen sabor. Una cerveza, especial por su color amarillo oro brillante, que al probarla destaca por su equilibrio, su frescura y su ligero amargor. Sus levaduras y maltas le dan una serie de matices al cuerpo y aroma que le otorgan un perfecto equilibrio entre suave y amargo."
        price: 2.5
        photo: "https://www.prikentik.be/media/wysiwyg/streekbieren/PrikenTik-bier.jpg",
        categories: [
          1,2
        ]
      )
    }
    `,
  ]
}

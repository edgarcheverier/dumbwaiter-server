mutation {
   createRestaurant(
    restaurantname: "Codeworks",
    description: "Best bananas in all of Poble Nou",
    latitude: "41.3949147",
    longitude: "2.1957668"
  	) {
    name,
    latitude,
    longitude
   }
}

{
  product(id: 1) {
    id
    name
    description
    price
  }
}

{
  restaurant {
    id
    name
    latitude
    longitude
    tables
    products
  }
}

mutation {
  createProduct(
    name: "Cerveza San Miguel"
    description: "San Miguel Especial Fue la primera cerveza especial en España y se ha convertido en la marca española de mayor exportación, con reconocido éxito nacional e internacional por su calidad y buen sabor. \n Una cerveza, especial por su color amarillo oro brillante, que al probarla destaca por su equilibrio, su frescura y su ligero amargor. Sus levaduras y maltas le dan una serie de matices al cuerpo y aroma que le otorgan un perfecto equilibrio entre suave y amargo. Un poco de historia:Enrique Suárez Rezola funda \"La Segarra S.A.\", dedicada a la fabricación de extractos de malta en la maltería de Els Condals. 1953: Los accionistas de La Segarra firman el 'Acuerdo de Manila' con el presidente de San Miguel Corporation Filipinas, Andrés Soriano. Nace así una nueva cervecera española, denominada La Segarra S.A., independiente de la matriz filipina. 1957: \"La Segarra\" cambia su denominación a \"San Miguel, Fábricas de Cerveza y Malta, S.A.\" y sale la primera botella de San Miguel Especial de la fábrica de Lleida. 1962: Se inicia la actividad exportadora de San Miguel. 1966: San Miguel pone en marcha una segunda fábrica en Málaga. 1970: San Miguel compra la fábrica de Burgos."
    price: 2.5
  ) {
    id,
    name
    description
    price
  }
}

mutation {
  updateProduct(
    id: 1,
    name: "Cerveza San Miguelín"
    price: 2.5
  ) {
    name
    price
  }
}

{
  restaurant {
    id
    name
    description
    latitude
    longitude
    photo
    products {
      name
      price
      categories {
        name
      }
      photos {
        url
      }
    }
  }

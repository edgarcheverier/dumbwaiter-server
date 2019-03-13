import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings'; //This was needed for some errors, test if can be removed later
iconv.encodings = encodings;
import db from './../config/database';

describe('Sequelize DB Testing',() => {
  beforeAll(async () => {
    await db.sync({force: true})
  })

  beforeEach(() => {
  })

  afterEach(async () => {
    // Drops all tables
    await db.drop();
  });

  afterAll(async () => {
    // Drops all tables
    db.close();
  });


  test('testingggg',  async () => {


    // let newRestaurant = {
    //   name: 'Codeworksssssssssssssss',
    //   latitude: '41.3949147',
    //   longitude: '2.1957668',
    //   description:
    //     'The best sandwiches that you can find in town! But only until 9:30am.',
    //   photo:
    //     'https://firebasestorage.googleapis.com/v0/b/dumbwaiter-69a9a.appspot.com/o/marlon_0000s_0000_codeworks.jpg?alt=media&token=497d943e-15a2-4c68-a4ae-d5ad9b029e77',
    //   type: 'japanese',
    //   ownerId: ''
    // };

    // await db.restaurants.create(newRestaurant);

    //accessing db tables,
      //Check if each table exists
      //check if each has correct columns
      //Data types? Null?
    expect('x').toBe('x');
  })
})

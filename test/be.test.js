import iconv from 'iconv-lite';
import encodings from 'iconv-lite/encodings'; //This was needed for some errors, test if can be removed later
iconv.encodings = encodings;
import db from './../config/database';

describe('Sequelize DB Testing',() => {
  beforeAll(async () => {
    await db.sequelize.sync( {force: true})
  })

  beforeEach(() => {
  })

  afterAll(async () => {
    await db.sequelize.drop();
  })

  test('testingggg',  async () => {
    //accessing db tables,
      //Check if each table exists
      //check if each has correct columns
      //Data types? Null?
    expect('x').toBe('x');
  })
})

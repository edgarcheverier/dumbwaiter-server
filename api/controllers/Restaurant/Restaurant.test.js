const restaurantCtrl = require('./RestaurantMutation');
const mock_photo = {};
const mock_restaurant = {};

describe('Restaurant controller test',() => {
  beforeAll(() => {
  });

  test('createRestaurant should return the new restaurant',  async () => {
    const newRestaurant = {
      name: 'Rod',
      description: 'Papa',
      latitude: '41.387938',
      longitude: '2.179066',
      type: 'queteimporta'
    };

    mock_restaurant.findOne = jest.fn(() => new Promise((resolve, reject) => resolve(false)));
    mock_restaurant.create = jest.fn(() => new Promise((resolve, reject) => resolve(newRestaurant)));

    const res = await restaurantCtrl.createRestaurant.resolve(null, newRestaurant, {restaurantModel: mock_restaurant});

    expect(res).toBe(newRestaurant);
  });

  test('createRestaurant should throw an error if the restaurant name already exists',  async () => {
    const newRestaurant = {
      name: 'Rod',
      description: 'Papa',
      latitude: '41.387938',
      longitude: '2.179066',
      type: 'queteimporta'
    };

    mock_restaurant.findOne = jest.fn(() => new Promise((resolve, reject) => resolve(true)));

    await expect(
      restaurantCtrl.createRestaurant.resolve(null, newRestaurant, {restaurantModel: mock_restaurant})
    ).rejects.toThrow('Restaurant already exists with the same name');
  });
})

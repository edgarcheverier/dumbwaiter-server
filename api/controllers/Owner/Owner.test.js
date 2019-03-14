const ownerCtrl = require('./OwnerMutation');
const mock_owner = {};
const mock_restaurant = {};

describe('Owner controller test', () => {
  beforeAll(() => {
  });

  test('createOwner should return the new owner', async () => {
    const newOwner = {
      name: 'Rod',
      lastname: 'Papa',
      email: 'tuhna@entanga.com',
      password: 'queteimporta',
    };

    mock_owner.findOne = jest.fn(() => new Promise((resolve, reject) => resolve(false)));
    mock_owner.create = jest.fn(() => new Promise((resolve, reject) => resolve(newOwner)));
    mock_restaurant.findAll = jest.fn(() => new Promise((resolve, reject) => resolve(false)));
    // Resolve to false so we don't have to run the restaurant.update()

    const res = await ownerCtrl.createOwner.resolve(null, newOwner, {ownerModel: mock_owner, restaurantModel: mock_restaurant});

    expect(res).toBe(newOwner);
  });

  test('createOwner should throw an error if the email is already in use', async () => {
    const newOwner = {
      name: 'Rod',
      lastname: 'Papa',
      email: 'tuhna@entanga.com',
      password: 'queteimporta',
    };

    mock_owner.findOne = jest.fn(() => new Promise((resolve, reject) => resolve(true)));
    mock_owner.create = jest.fn(() => new Promise((resolve, reject) => resolve(newOwner)));
    mock_restaurant.findAll = jest.fn(() => new Promise((resolve, reject) => resolve(false)));

    await expect(
      ownerCtrl.createOwner.resolve(null, newOwner, {ownerModel: mock_owner, restaurantModel: mock_restaurant})
    ).rejects.toThrow('Owner exists with the same email');
  });
})

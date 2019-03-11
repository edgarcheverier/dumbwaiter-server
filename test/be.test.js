// import AuthController from './../api/controllers/Auth/AuthController';
// import Category from './../api/models/Category/Category';

var SequelizeMock = require('sequelize-mock');
var dbMock = new SequelizeMock();

var UserMock = dbMock.define('users', {
  'name':'amber',
})

// describe('AuthController', () => {
//   const request = {
//     headers: {
//       authorization: 'Basic dGVzdEB0ZXN0LmNvbTp0ZXN0'
//     }
//   }

//   test('loginRms', () => {
//     expect(
//       AuthController.loginRms(request)
//     ).toBe(3);
//   });
// })

describe('Sequelize Model Testing',() => {
  // let dbMock;

  // before(() => {
  //   dbMock = new SequelizeMock();
  // })

  // beforeEach(() => {
  //   dbMock.Users.deleteAll

  // })

  test('testingggg',  async () => {
    // UserMock.insert("something")
    let user = await UserMock.findOne({
        where: {
          name: 'amber'
        }
      }).then(response => {
        return response;
      });

    expect(user.dataValues.name).toBe('amber');

    // expect(user.dataValues).hasOwnProperty('name')
    //   or
    // try {
    //   Users.insert()
    // } catch (err) {
    //   expect(err).to
    // }
  })
})
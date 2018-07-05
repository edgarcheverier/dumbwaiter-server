const authService = require('./auth.service');
const User = require('../models/User/User');
const Owner = require('../models/Owner/Owner');

const authUserService = () => {
  const getUser = async token => {
    if (!token) {
      return false;
    }
    const response = authService().verify(token);
    let user = false;

    if (response && response.id) {
      if (response.type == 'USER') {
        user = await User.findOne({
          where: {
            id: response.id,
          },
        });
        user.type = 'USER';
      }

      if (response.type == 'OWNER') {
        user = await Owner.findOne({
          where: {
            id: response.id,
          },
        });
        user.type = 'OWNER';
      }
    }

    return user;
  };

  return {
    getUser,
  };
};

module.exports = authUserService;

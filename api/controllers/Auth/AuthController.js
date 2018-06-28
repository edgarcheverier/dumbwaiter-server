const atob = require('atob');
const bcrypt = require('bcrypt-nodejs');
const User = require('../../models/User/User');
const Restaurant = require('../../models/Restaurant/Restaurant');
const authService = require('../../services/auth.service');
const bcryptService = require('../../services/bcrypt.service');

const AuthController = () => {
  const register = async (req, res) => {
    const {
      email,
      password,
      password2,
    } = req.body;

    if (password === password2) {
      try {
        const user = await User.create({
          email,
          password,
        });
        const token = authService().issue({
          id: user.id,
          type: 'USER'
        });
        return res.status(200).json({ token, user });
      } catch (err) {
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }
    return res.status(400).json({ msg: 'Bad Request: Passwords don\'t match' });
  };

  const loginCustomer = async (req, res) => {
      const authorization = atob(req.headers.authorization.split('Basic ').pop()).split(':');
      const externalLoginId = authorization[0];
      if (externalLoginId) {
        try {
          const user = await User.findOne({
            where: {
              externalLoginId,
              type: 'USER'
            },
          });

          if (!user) {
            return res.status(400).json({ msg: 'Bad Request: User not found' });
          }

          const token = authService().issue({
            id: user.id,
            type: 'USER'
          });

          return res.status(200).json({ token, user });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        }
      }

      return res.status(400).json({ msg: 'Bad Request: Email and password don\'t match' });
  }

  const loginRms = async (req, res) => {
    if(!req.headers.authorization) return res.status(401).json({ msg: 'Unauthorized' });
    const authorization = atob(req.headers.authorization.split('Basic ').pop()).split(':');
    const email = authorization[0];
    const password = authorization[1];

    if (email && password) {
      try {
        const user = await User.findOne({
          where: {
            email,
            type: 'RESTAURANT_OWNER'
          },
        });

        if (!user) {
          return res.status(400).json({ msg: 'Bad Request: User not found' });
        }

        const restaurant = await Restaurant.findOne({
          where: { UserId: user.id }
        });

        if (bcryptService().comparePassword(password, user.password)) {
          const token = authService().issue({
            id: user.id,
            type: user.type,
            restaurantId: restaurant.id
          });
          return res.status(200).json({ token, user });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({ msg: 'Bad Request: Email and password don\'t match' });
  };

  const validate = (req, res) => {
    const tokenToVerify = req.body.token;

    try {
      const err = authService().verify(tokenToVerify);

      if (err) {
        return res.status(401).json({ isvalid: false, err: 'Unauthorized: Invalid Token' });
      }

      return res.status(200).json({ isvalid: true });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    loginCustomer,
    register,
    loginRms,
    validate,
  };
};

module.exports = AuthController;

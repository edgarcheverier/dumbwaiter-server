const FB            = require('fb');
const atob          = require('atob');
const bcrypt        = require('bcrypt-nodejs');
const User          = require('../../models/User/User');
const Restaurant    = require('../../models/Restaurant/Restaurant');
const authService   = require('../../services/auth.service');
const bcryptService = require('../../services/bcrypt.service');

const AuthController = () => {
  const register = async (req, res) => {
    const {
      name,
      lastname,
      email,
      password,
    } = req.body;

      try {
        const user = await User.create({
          name,
          lastname,
          email,
          password,
        });

        const restaurant = await Restaurant.create({
          name: 'Add your restaurant name',
          description: 'Add your restaurant description',
        });

        restaurant.setUser(user);
        restaurant.save();

        return res.status(200).json({ restaurant, user });
      } catch (err) {
        return res.status(500).json({ msg: 'Internal server error' });
      }
  };

  const authFacebook = async (req, res) => {
      const { accessToken, userID, expiresIn, signedRequest } = req.body;

      console.log('BODY', req.body);
      console.log(accessToken, userID, expiresIn, signedRequest);

      FB.options({
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET,
        version: process.env.FACEBOOK_API_VERSION,
        accessToken: accessToken,
      });

      console.log({
        appId: process.env.FACEBOOK_APP_ID,
        appSecret: process.env.FACEBOOK_APP_SECRET,
        version: process.env.FACEBOOK_API_VERSION,
        accessToken: accessToken,
      });

      FB.api('/me', async (response) => {
        if(!response || res.error) {
          console.log(!response ? 'error occurred' : res.error);
          return;
        }
        console.log('RESPONSE', response);
        try {
          let user = {};
          if(response.email) {
            user = await User.findOne({
              where: {
                email: response.email,
                type: 'USER'
              },
            });
          } else if(response.name) {
            user = await User.findOne({
              where: {
                email: response.name,
                type: 'USER'
              },
            });
          }

          if (!user) {
            user = await User.create({
              name: response.name,
              externalLoginId: userID
            });
          }

          const token = await authService().issue({
            id: user.id,
            type: 'USER'
          });

          return res.status(200).json({ token, user });
        } catch (err) {
          console.log(err);
          return res.status(500).json({ msg: 'Internal server error' });
        }
        return res.status(400).json({ msg: 'Bad Request: Email and password don\'t match' });
      });
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

  const validate = async (req, res) => {
    const tokenToVerify = req.body.token;
    console.log(req.body);
    console.log(tokenToVerify);
    try {
      const response = authService().verify(tokenToVerify);
      if ((response && !response.id) || !response) {
        return res.status(401).json({ isvalid: false, err: 'Unauthorized: Invalid Token' });
      }

      const user = await User.findOne({
        where: {
          id: response.id
        },
      });

      return res.status(200).json({ isvalid: true, user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    authFacebook,
    register,
    loginRms,
    validate,
  };
};

module.exports = AuthController;

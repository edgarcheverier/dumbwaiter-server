const FB = require('fb');
const atob = require('atob');
const bcrypt = require('bcrypt-nodejs');
const User = require('../../models/User/User');
const Owner = require('../../models/Owner/Owner');
const Restaurant = require('../../models/Restaurant/Restaurant');
const authService = require('../../services/auth.service');
const authUserService = require('../../services/auth.user.service');
const bcryptService = require('../../services/bcrypt.service');

const AuthController = () => {
  const registerOwner = async (req, res) => {
    const {
      name,
      lastname,
      email,
      password,
      restaurantname,
      latitude,
      longitude,
    } = req.body;
    try {
      const owner = await Owner.create({
        name,
        lastname,
        email,
        password,
        restaurantId //added
      });

      const restaurant = await Restaurant.create({
        name: restaurantname,
        latitude,
        longitude,
        description: 'Add your restaurant description',
        //ownerId, // added
      });

      restaurant.setOwner(owner);
      restaurant.save();

      return res.status(200).json({ restaurant, owner });
    } catch (err) {
      return res.status(500).json({ msg: 'Internal server error' });
    }
    return res.status(500).json({ msg: 'Error creating the restaurant' });
  };

  const authFacebook = async (req, res) => {
    const { accessToken, userID, expiresIn, signedRequest } = req.body;
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

    FB.api('/me', async response => {
      if (!response || res.error) {
        console.log(!response ? 'error occurred' : res.error);
        return;
      }
      try {
        let user = {};
        if (response.email) {
          user = await User.findOne({
            where: {
              email: response.email,
              type: 'USER',
            },
          });
        } else if (response.name) {
          user = await User.findOne({
            where: {
              email: response.name,
              type: 'USER',
            },
          });
        }

        if (!user) {
          user = await User.create({
            name: response.name,
            externalLoginId: userID,
          });
        }

        const token = await authService().issue({
          id: user.id,
          type: 'USER',
        });

        return res.status(200).json({ token, user });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
      return res.status(400).json({
        msg: "Bad Request: Email and password don't match",
      });
    });
  };

  const loginRms = async (req, res) => {
    if (!req.headers.authorization) {
      return res.status(401).json({ msg: 'Unauthorized' });
    }
    const authorization = atob(
      req.headers.authorization.split('Basic ').pop()
    ).split(':');
    const email = authorization[0];
    const password = authorization[1];

    if (email && password) {
      try {
        const owner = await Owner.findOne({
          where: {
            email,
          },
        });

        console.log(owner);
        if (!owner) {
          return res.status(400).json({ msg: 'Bad Request: User not found' });
        }

        const restaurant = await Restaurant.findOne({
          where: {
            //ownerId: owner.id   // this is null right now
          }
        });
        console.log(restaurant);

        if (bcryptService().comparePassword(password, owner.password)) {
          const token = authService().issue({
            id: owner.id,
            type: 'OWNER',
            restaurantId: restaurant.id,
          });
          console.log('token', token);
          // The token is not being stored in the frontend
          return res.status(200).json({ token, owner });
        }

        return res.status(401).json({ msg: 'Unauthorized' });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ msg: 'Internal server error' });
      }
    }

    return res.status(400).json({
      msg: "Bad Request: Email and password don't match",
    });
  };

  const validate = async (req, res) => {
    const tokenToVerify = req.body.token;
    try {
      const user = await authUserService().getUser(tokenToVerify);
      if (!user) {
        return res.status(401).json({
          isvalid: false,
          err: 'Unauthorized: Invalid Token',
        });
      }

      return res.status(200).json({ isvalid: true, user });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ msg: 'Internal server error' });
    }
  };

  return {
    authFacebook,
    registerOwner,
    loginRms,
    validate,
  };
};

module.exports = AuthController;

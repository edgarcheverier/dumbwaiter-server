const publicRoutes = {
  'POST /register-owner': 'AuthController.registerOwner',
  'POST /auth-facebook': 'AuthController.authFacebook',
  'POST /login-rms': 'AuthController.loginRms',
  'POST /validate': 'AuthController.validate',
};

module.exports = publicRoutes;

const publicRoutes = {
  'POST /register': 'AuthController.register',
  'POST /auth-facebook': 'AuthController.authFacebook',
  'POST /login-rms': 'AuthController.loginRms',
  'POST /validate': 'AuthController.validate',
};

module.exports = publicRoutes;

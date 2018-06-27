const publicRoutes = {
  'POST /register': 'AuthController.register',
  'POST /validate-customer': 'AuthController.loginCustomer',
  'POST /login-rms': 'AuthController.loginRms',
  'POST /validate': 'AuthController.validate',
};

module.exports = publicRoutes;

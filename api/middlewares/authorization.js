const authService = require('../services/auth.service');

 const authorization = (req, res, next) => {
  if(req.headers.authorization) {
    const matches = req.headers.authorization.match(/Bearer\s(\S+)/);
    if(matches) {
      const error = authService().verify(matches[1], async (err, auth) => {
        if(err) console.log('Not valid authorization token', err)
        req.auth = auth;
      });
    }
  }
  next();
}

module.exports = authorization;

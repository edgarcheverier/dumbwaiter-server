/**
 * third party libraries
 */
const cors = require('cors');
const http = require('http');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const mapRoutes = require('express-routes-mapper');
const { graphqlExpress } = require('apollo-server-express');
const expressPlayground = require('graphql-playground-middleware-express').default;

/**
 * server configuration
 */
const config = require('../config/');
const schema = require('./controllers/');
const auth = require('./policies/auth.policy');
const dbService = require('./services/db.service');
const authService = require('./services/auth.service');

const environment = process.env.NODE_ENV;

/**
* Custome middleware
*/
const authorization = require('./middlewares/authorization');

/**
 * express application
 */
const api = express();
const server = http.Server(api);
const mappedRoutes = mapRoutes(config.publicRoutes, 'api/controllers/Auth/');
const DB = dbService(environment, config.migrate).start();

// allow cross origin requests
// configure to allow only requests from certain origins
api.use(cors());

// secure express app
api.use(helmet({
  dnsPrefetchControl: false,
  frameguard: false,
  ieNoOpen: false,
}));

//Get the user from the JWT if there is one
api.use(authorization);

// parsing the request bodys
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

// public REST API
api.use('/', mappedRoutes);

// private GraphQL API
api.all('/graphql');
api.use('/graphql', bodyParser.json(), graphqlExpress(req => ({ schema, context: { user: req.user }, cacheControl: true })));

//Playground tool for GraphQL
api.get('/explore', expressPlayground({ endpoint: '/graphql' }));

server.listen(config.port, () => {
  if (environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    console.error(`NODE_ENV is set to ${environment}, but only production and development are valid.`);
    process.exit(1);
  }
  return DB;
});

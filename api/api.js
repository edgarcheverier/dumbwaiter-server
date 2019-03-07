require('dotenv').config();
/**
 * third party libraries
 */
const cors = require('cors');
const http = require('http');
const helmet = require('helmet');
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan')('combined');
const { execute, subscribe } = require('graphql');
const { pubsub } = require('./subscriptions');
const mapRoutes = require('express-routes-mapper');
const authUserService = require('./services/auth.user.service');
const { graphqlExpress } = require('apollo-server-express');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const expressPlayground = require('graphql-playground-middleware-express')
  .default;

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
api.use(morgan);

// secure express app
api.use(
  helmet({
    dnsPrefetchControl: false,
    frameguard: false,
    ieNoOpen: false,
  })
);

//Get the user from the JWT if there is one
api.use(authorization);

// parsing the request bodys
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

// public REST API
api.use('/', mappedRoutes);

// private GraphQL API
api.all('/graphql');
api.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress(req => ({
    schema,
    context: { auth: req.auth },
    cacheControl: true,
  }))
);

//Playground tool for GraphQL
api.get(
  '/explore',
  expressPlayground({
    endpoint: '/graphql',
    subscriptionsEndpoint: 'ws://localhost:2018/subscriptions',
  })
);

server.listen(config.port, () => {
  new SubscriptionServer(
    {
      execute,
      subscribe,
      schema,
      onConnect: async (connectionParams, webSocket, context) => {
        let token = false;
        if (connectionParams.token) {
          token = connectionParams.token;
        } else {
          const matches = connectionParams.Authorization.match(/Bearer\s(\S+)/);
          if (matches) {
            token = matches[1];
          }
        }
        if (token) {
          const user = await authUserService().getUser(token);
          console.log('Connected throuh socket', user.type, user.id);
          if (user) {
            return { user };
          }
          throw new Error('Missing auth token!');
        }
        // console.log('Subscription server connected');
      },
      onOperation: (message, params, webSocket) => {
        // console.log('Subscription server operation');
        // console.log(message);
        // console.log(params);
        return message;
      },
      onOperationComplete: webSocket => {
        // console.log('Subscription server operation complete');
      },
      onDisconnect: (webSocket, context) => {
        // console.log('Subscription server disconnected');
      },
    },
    {
      server: server,
      path: '/subscriptions',
    }
  );

  console.log('GraphQL Server is now running');
  console.log('Subscriptions are running on /subscriptions');

  if (
    environment !== 'production' &&
    environment !== 'development' &&
    environment !== 'testing'
  ) {
    console.error(
      `NODE_ENV is set to ${environment}, but only production and development are valid.`
    );
    process.exit(1);
  }
  return DB;
});

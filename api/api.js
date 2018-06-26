/**
 * third party libraries
 */
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const { graphqlExpress } = require('apollo-server-express');
const helmet = require('helmet');
const http = require('http');
const mapRoutes = require('express-routes-mapper');
const expressPlayground = require('graphql-playground-middleware-express').default;

/**
 * server configuration
 */
const config = require('../config/');
const auth = require('./policies/auth.policy');
const dbService = require('./services/db.service');
const schema = require('./controllers/');

// environment: development, testing, production
const environment = process.env.NODE_ENV;

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

// parsing the request bodys
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

// public REST API
api.use('/rest', mappedRoutes);

// private GraphQL API
api.all('/graphql');
api.use('/graphql', bodyParser.json(), graphqlExpress({ schema, cacheControl: true }));

api.get('/explore', expressPlayground({ endpoint: '/graphql' }));
api.get('/ppl', () => {
  const QUERYS = require('../mocks/ppl');
  const {graphql} = require('graphql');
  for(const group in QUERYS) {
    console.log(`Loading data ${group}...`);
    QUERYS[group].forEach(async (query) => {
      console.log(query);

       setTimeout(() => {
         graphql(schema, query).then(result => {
         if(result.errors) console.log('Error loading data', result.errors);
       });
     }, 100);
    });
  }
});

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

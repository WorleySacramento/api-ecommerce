import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'Ecommerce API',
    description: 'Api para gestão de dados de ecommerce'
  },
  host: '127.0.0.1:5001/ecmomerce-b375f/us-central1/api',
  basePath: '/api',
  schemes: ['http'],
};

const outputFile = './swagger-output.json';
const routes = ['./src/routes/index.ts'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen()(outputFile, routes, doc);
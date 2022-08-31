require('express-async-errors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const routes = require('./routes');
const swaggerFile = require('../swagger_output.json');

const app = express();
app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
routes(app);

app.use(errorHandlerMiddleware);

module.exports = app;

require('express-async-errors');
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const routes = require('./routes');
const swaggerFile = require('../swagger_output.json');

const app = express();
app.use(express.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
routes(app);

app.use(errorHandlerMiddleware);

module.exports = app;

require('express-async-errors');
const express = require('express');
const errorHandlerMiddleware = require('./middlewares/errorHandlerMiddleware');
const routes = require('./routes');

const app = express();
app.use(express.json());
routes(app);

app.use(errorHandlerMiddleware);

module.exports = app;

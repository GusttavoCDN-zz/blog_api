// require('express-async-errors');
const usersRouter = require('./usersRouter');
const loginRouter = require('./loginRouter');

module.exports = (app) => {
  app.use('/user', usersRouter);
  app.use(loginRouter);
};

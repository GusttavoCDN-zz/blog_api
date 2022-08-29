// require('express-async-errors');
const usersRouter = require('./usersRouter');
const loginRouter = require('./loginRouter');
const categoriesRouter = require('./categoriesRouter');

module.exports = (app) => {
  app.use('/user', usersRouter);
  app.use('/categories', categoriesRouter);
  app.use(loginRouter);
};

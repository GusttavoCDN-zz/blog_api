const usersRouter = require('./usersRouter');
const loginRouter = require('./loginRouter');
const categoriesRouter = require('./categoriesRouter');
const postsRouter = require('./postsRouter');

module.exports = (app) => {
  app.use(loginRouter);
  app.use('/user', usersRouter);
  app.use('/categories', categoriesRouter);
  app.use('/post', postsRouter);
};

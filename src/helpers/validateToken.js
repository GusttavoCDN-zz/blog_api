require('dotenv').config();
const jwt = require('jsonwebtoken');

const validateToken = (token) => {
  const data = jwt.verify(token, process.env.JWT_SECRET);
  return data.user;
};

module.exports = validateToken;

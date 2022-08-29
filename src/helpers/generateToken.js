const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload, jwtConfig) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = generateToken;

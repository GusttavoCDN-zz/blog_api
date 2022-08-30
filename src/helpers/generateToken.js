const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (payload) => {
  const user = {
    id: payload.id,
    displayName: payload.displayName,
    email: payload.email,
    image: payload.image,
  };

  const jwtConfig = {
    expiresIn: '1h',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, jwtConfig);
  return token;
};

module.exports = generateToken;

const generateToken = require('../helpers/generateToken');
const { User } = require('../database/models');
const throwError = require('../helpers/throwError');

class AuthService {
  static async validateEmailAndPassword(email, password) {
    return User.findOne({ where: { email, password } });
  }

  static async createToken({ email, password }) {
    if (!email || !password) {
      return throwError('badRequest', 'Some required fields are missing');
    }

    const user = await this.validateEmailAndPassword(email, password);
    if (!user) return throwError('badRequest', 'Invalid fields');

    const token = generateToken(user);
    return token;
  }
}

module.exports = AuthService;

const generateToken = require('../helpers/generateToken');
const { User } = require('../database/models');
const throwError = require('../helpers/throwError');

class AuthService {
  static async validateEmailAndPassword({ email, password }) {
    return User.findOne({ where: { email, password } });
  }

  static async createToken(user) {
    if (!user.email || !user.password) {
      return throwError('badRequest', 'Some required fields are missing');
    }

    const isUserValid = await this.validateEmailAndPassword(user);
    if (!isUserValid) return throwError('badRequest', 'Invalid fields');

    const token = generateToken({ user: user.email });
    return token;
  }
}

module.exports = AuthService;

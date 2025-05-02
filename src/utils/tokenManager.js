import jwt from 'jsonwebtoken';

class TokenManager {
  static generateToken(payload) {
    const secret = process.env.JWT_SECRET;
    const options = { expiresIn: '1h' }; // El token expirará en 1 hora
    return jwt.sign(payload, secret, options);
  }

  static verifyToken(token) {
    const secret = process.env.JWT_SECRET;
    try {
      return jwt.verify(token, secret);
    } catch (error) {
      throw new Error('Token inválido o expirado');
    }
  }
}

export default TokenManager;
import jwt from 'jsonwebtoken';
import config from '../config/passport';

class SessionController {
  async register(req, res, next) {
    try {
      res.status(201).json({ message: 'Usuario registrado con éxito' });
    } catch (error) {
      next(error);
    }
  }

  async login(req, res, next) {
    try {
      const user = req.user;
      const token = jwt.sign({ id: user._id, role: user.role }, config.jwt_secret, {
        expiresIn: '1d',
      });
      res.cookie('token', token, { httpOnly: true }).json({ message: 'Login exitoso' });
    } catch (error) {
      next(error);
    }
  }

  async current(req, res, next) {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      res.clearCookie('token').json({ message: 'Logout exitoso' });
    } catch (error) {
      next(error);
    }
  }
}

export default new SessionController();
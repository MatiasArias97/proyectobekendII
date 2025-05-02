import UserRepository from '../repositories/users.repository.js';
import jwt from 'jsonwebtoken';
const userRepo = new UserRepository();

export const register = async (req, res, next) => {
  try {
    const newUser = await userRepo.registerUser(req.body);
    res.status(201).json({ status: 'success', user: newUser });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Verifica el usuario
    const user = await userRepo.loginUser(email, password);
    
    // Si el usuario existe y las credenciales son correctas
    if (user) {
      // Generar el token JWT
      const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }  // El token expira en 1 hora
      );

      // Responder con el token y los datos del usuario
      res.json({
        status: 'success',
        token,  // El token se devuelve
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          email: user.email,
          role: user.role
        }
      });
    } else {
      res.status(400).json({ status: 'error', message: 'Invalid credentials' });
    }
  } catch (error) {
    next(error);
  }
};

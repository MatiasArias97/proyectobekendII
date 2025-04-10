import { UserModel } from '../models/User.js';
import { hashPassword, comparePassword } from '../utils/hash.js';
import { generateToken } from '../utils/jwt.js';

export const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body;
    const hashedPassword = hashPassword(password);
    const newUser = await UserModel.create({
      first_name,
      last_name,
      email,
      age,
      password: hashedPassword
    });
    res.status(201).json({ message: 'Usuario registrado', user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).json({ message: 'Credenciales incorrectas' });
    }

    const token = generateToken(user);
    res.cookie('token', token, { httpOnly: true }).json({ message: 'Login exitoso', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const currentUser = (req, res) => {
  if (!req.user) {
    return res.status(401).json({ message: 'No autorizado' });
  }
  res.json({ user: req.user });
};
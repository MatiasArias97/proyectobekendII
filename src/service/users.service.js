import UserDAO from '../dao/mongo/user.dao.js';
import UserDTO from '../dto/user.dto.js';
import { createHash, validatePassword } from '../utils/passwordEncryptor.js';

const userDAO = new UserDAO();

export default class UserService {
  async register(userData) {
    const exists = await userDAO.getByEmail(userData.email);
    if (exists) throw new Error('Usuario ya registrado');
    
    userData.password = createHash(userData.password);
    const newUser = await userDAO.create(userData);
    return new UserDTO(newUser);
  }

  async login(email, password) {
    const user = await userDAO.getByEmail(email);
    if (!user || !validatePassword(password, user.password)) {
      throw new Error('Credenciales inválidas');
    }
    return new UserDTO(user);
  }

  async getUserById(id) {
    const user = await userDAO.getById(id);
    return user ? new UserDTO(user) : null;
  }
}
import UserService from '../service/users.service.js';

const userService = new UserService();

export default class UserRepository {
  registerUser = async (userData) => {
    return await userService.register(userData);
  };

  loginUser = async (email, password) => {
    return await userService.login(email, password);
  };

  getUserById = async (id) => {
    return await userService.getUserById(id);
  };
}
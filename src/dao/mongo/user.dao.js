import UserModel from '../models/user.model.js';

export default class UserDAO {
  async create(userData) {
    return await UserModel.create(userData);
  }

  async getByEmail(email) {
    return await UserModel.findOne({ email });
  }

  async getById(id) {
    return await UserModel.findById(id);
  }
}
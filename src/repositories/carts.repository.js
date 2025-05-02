import CartDAO from '../dao/mongo/carts.dao.js';

class CartsRepository {
  constructor() {
    this.dao = new CartDAO();
  }

  async getCartById(cid) {
    return await this.dao.getCartById(cid);
  }

  async createCart() {
    return await this.dao.createCart();
  }

  async addProductToCart(cid, pid, quantity) {
    return await this.dao.addProductToCart(cid, pid, quantity);
  }

  async removeProductFromCart(cid, pid) {
    return await this.dao.removeProductFromCart(cid, pid);
  }

  async updateCart(cid, products) {
    return await this.dao.updateCart(cid, products);
  }

  async updateProductQuantity(cid, pid, quantity) {
    return await this.dao.updateProductQuantity(cid, pid, quantity);
  }

  async clearCart(cid) {
    return await this.dao.clearCart(cid);
  }
}

export default CartsRepository;
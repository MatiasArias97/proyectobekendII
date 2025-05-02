import CartDAO from '../dao/mongo/carts.dao.js';
import ProductService from './products.service.js';
import TicketService from './tickets.service.js';

class CartsService {
  constructor() {
    this.cartDao = new CartDAO();
    this.productService = new ProductService();
    this.ticketService = new TicketService();
  }

  async getCartById(cid) {
    return await this.cartDao.getById(cid);
  }

  async createCart() {
    return await this.cartDao.create();
  }

  async addProduct(cid, pid) {
    const product = await this.productService.getProductById(pid);
    if (!product) throw new Error('Producto no encontrado');
    return await this.cartDao.addProduct(cid, pid);
  }

  async removeProduct(cid, pid) {
    return await this.cartDao.removeProduct(cid, pid);
  }

  async updateQuantity(cid, pid, quantity) {
    return await this.cartDao.updateQuantity(cid, pid, quantity);
  }

  async replaceProducts(cid, newProducts) {
    return await this.cartDao.replaceProducts(cid, newProducts);
  }

  async clearCart(cid) {
    return await this.cartDao.clearCart(cid);
  }

  async purchase(cid, purchaser) {
    const cart = await this.cartDao.getById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    const { ticket, notProcessed } = await this.ticketService.generateTicket(cart, purchaser);
    return { ticket, notProcessed };
  }
}

export default CartsService;
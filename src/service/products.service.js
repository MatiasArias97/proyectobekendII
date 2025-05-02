import ProductDAO from '../dao/mongo/products.dao.js';

class ProductService {
  constructor() {
    this.productDao = new ProductDAO();
  }

  async getAllProducts(filters = {}, options = {}) {
    return await this.productDao.getAll(filters, options);
  }

  async getProductById(pid) {
    return await this.productDao.getById(pid);
  }

  async createProduct(productData) {
    return await this.productDao.create(productData);
  }

  async updateProduct(pid, updateData) {
    return await this.productDao.update(pid, updateData);
  }

  async deleteProduct(pid) {
    return await this.productDao.delete(pid);
  }
}

export default ProductService;
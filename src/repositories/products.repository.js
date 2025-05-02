import ProductDAO from '../dao/mongo/products.dao.js';

class ProductRepository {
  constructor() {
    this.dao = ProductDAO; // ya es una instancia
  }

  async getAll(query, options) {
    return await this.dao.getAllProducts(query, options);
  }

  async getById(id) {
    return await this.dao.getProductById(id);
  }

  async getByCode(code) {
    return await this.dao.getProductByCode(code); // este método debe existir en el DAO
  }

  async create(productData) {
    return await this.dao.createProduct(productData);
  }

  async update(id, updateData) {
    return await this.dao.updateProduct(id, updateData);
  }

  async delete(id) {
    return await this.dao.deleteProduct(id);
  }
}

export default new ProductRepository();

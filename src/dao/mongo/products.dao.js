import ProductModel from '../models/product.model.js';

class ProductDAO {
  async getAllProducts(filter = {}, options = {}) {
    try {
      return await ProductModel.paginate(filter, options);
    } catch (error) {
      throw new Error('Error al obtener los productos: ' + error.message);
    }
  }

  async getProductById(id) {
    try {
      return await ProductModel.findById(id);
    } catch (error) {
      throw new Error('Error al obtener el producto: ' + error.message);
    }
  }

  async getProductByCode(code) {
    try {
      return await ProductModel.findOne({ code });
    } catch (error) {
      throw new Error('Error al buscar el producto por código: ' + error.message);
    }
  }

  async createProduct(productData) {
    try {
      return await ProductModel.create(productData);
    } catch (error) {
      throw new Error('Error al crear el producto: ' + error.message);
    }
  }

  async updateProduct(id, updateData) {
    try {
      return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
    } catch (error) {
      throw new Error('Error al actualizar el producto: ' + error.message);
    }
  }

  async deleteProduct(id) {
    try {
      return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
      throw new Error('Error al eliminar el producto: ' + error.message);
    }
  }
}

export default new ProductDAO();

import CartModel from '../models/cart.model.js';

class CartDAO {
  async getCartById(id) {
    return await CartModel.findById(id).populate('products.product');
  }

  async createCart() {
    return await CartModel.create({});
  }

  async updateCart(id, cartData) {
    return await CartModel.findByIdAndUpdate(id, cartData, { new: true });
  }

  async deleteProductFromCart(cartId, productId) {
    return await CartModel.findByIdAndUpdate(
      cartId,
      { $pull: { products: { product: productId } } },
      { new: true }
    );
  }

  async emptyCart(cartId) {
    return await CartModel.findByIdAndUpdate(
      cartId,
      { products: [] },
      { new: true }
    );
  }
}

export default new CartDAO();
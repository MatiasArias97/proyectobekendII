import CartModel from '../dao/models/cart.model.js';
import ProductModel from '../dao/models/product.model.js';
import TicketModel from '../dao/models/ticket.model.js';
import { v4 as uuidv4 } from 'uuid';

class CartsController {
  async getAllCarts(req, res) {
    try {
      const carts = await CartModel.find();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json({ message: 'Error al obtener carritos', error: err });
    }
  }

  async createCart(req, res) {
    try {
      const newCart = new CartModel({ products: [] });
      await newCart.save();
      res.status(201).json(newCart);
    } catch (err) {
      res.status(500).json({ message: 'Error al crear el carrito', error: err });
    }
  }

  async addProductToCart(req, res) {
    try {
      const { cid } = req.params;
      const { productId, quantity } = req.body;
      const cart = await CartModel.findById(cid);
      if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

      const productIndex = cart.products.findIndex(item => item.product.toString() === productId);
      if (productIndex !== -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }

      await cart.save();
      res.status(200).json(cart);
    } catch (err) {
      res.status(500).json({ message: 'Error al agregar producto al carrito', error: err });
    }
  }

  async removeProductFromCart(req, res) {
    try {
      const { cid, pid } = req.params;
      const cart = await CartModel.findById(cid);
      if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

      const productIndex = cart.products.findIndex(item => item.product.toString() === pid);
      if (productIndex === -1) return res.status(404).json({ message: 'Producto no encontrado en el carrito' });

      cart.products.splice(productIndex, 1);
      await cart.save();
      res.status(200).json({ message: 'Producto eliminado del carrito', cart });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar el producto del carrito', error: err });
    }
  }

  async updateCart(req, res) {
    try {
      const { id } = req.params;
      const updatedCart = await CartModel.findByIdAndUpdate(id, req.body, { new: true });
      if (!updatedCart) return res.status(404).json({ message: 'Carrito no encontrado' });
      res.status(200).json(updatedCart);
    } catch (err) {
      res.status(500).json({ message: 'Error al actualizar el carrito', error: err });
    }
  }

  async deleteCart(req, res) {
    try {
      const { id } = req.params;
      const deletedCart = await CartModel.findByIdAndDelete(id);
      if (!deletedCart) return res.status(404).json({ message: 'Carrito no encontrado' });
      res.status(200).json({ message: 'Carrito eliminado con éxito' });
    } catch (err) {
      res.status(500).json({ message: 'Error al eliminar el carrito', error: err });
    }
  }

  // Método para finalizar la compra
  async purchaseCart(req, res) {
    try {
      const { cid } = req.params;
      const user = req.user; // Passport debería haber agregado esto

      const cart = await CartModel.findById(cid).populate('products.product');
      if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

      const productosNoComprados = [];
      const productosComprados = [];

      for (const item of cart.products) {
        const producto = item.product;
        const cantidad = item.quantity;

        if (producto.stock >= cantidad) {
          producto.stock -= cantidad;
          await producto.save();
          productosComprados.push({ product: producto._id, quantity: cantidad });
        } else {
          productosNoComprados.push({ product: producto._id, quantity: cantidad });
        }
      }

      // Si hay al menos un producto comprado, crear ticket
      let ticket = null;
      if (productosComprados.length > 0) {
        const totalAmount = productosComprados.reduce((acc, item) => {
          const prod = cart.products.find(p => p.product._id.equals(item.product));
          return acc + (prod.product.price * item.quantity);
        }, 0);

        ticket = await TicketModel.create({
          code: uuidv4(),
          purchase_datetime: new Date(),
          amount: totalAmount,
          purchaser: user.email,
        });

        // Limpiar el carrito de productos comprados
        cart.products = productosNoComprados;
        await cart.save();
      }

      res.status(200).json({
        message: 'Compra procesada',
        ticket,
        productosNoComprados
      });

    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error al procesar la compra', error: err });
    }
  }
}

export default CartsController;

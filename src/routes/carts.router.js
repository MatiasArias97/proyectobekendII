import { Router } from 'express';
import passport from 'passport';
import CartsController from '../controllers/carts.controller.js';  // Asegúrate de que esta ruta sea correcta

const router = Router();

// Instancia del controlador de carritos
const cartsController = new CartsController();

// Ruta para obtener todos los carritos, protegida por JWT
router.get('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  cartsController.getAllCarts(req, res);  // Verifica que el controlador esté retornando una función
});

// Ruta para crear un nuevo carrito, protegida por JWT
router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
  cartsController.createCart(req, res);  // Verifica que el controlador esté retornando una función
});

// Ruta para agregar un producto al carrito, protegida por JWT
router.post('/:cid/products', passport.authenticate('jwt', { session: false }), (req, res) => {
  cartsController.addProductToCart(req, res);  // Aquí vinculamos el controlador para agregar el producto al carrito
});

// Ruta para eliminar un producto del carrito, protegida por JWT
router.delete('/:cid/products/:pid', passport.authenticate('jwt', { session: false }), (req, res) => {
  cartsController.removeProductFromCart(req, res);  // Aquí vinculamos el controlador para eliminar el producto
});

// Ruta para actualizar un carrito, protegida por JWT
router.put('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  cartsController.updateCart(req, res);  // Verifica que el controlador esté retornando una función
});

// Ruta para eliminar un carrito, protegida por JWT
router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
  cartsController.deleteCart(req, res);  // Verifica que el controlador esté retornando una función
});

// Ruta para finalizar la compra de un carrito
router.post('/:cid/purchase', passport.authenticate('jwt', { session: false }), (req, res) => {
  cartsController.purchaseCart(req, res);
});

export default router;

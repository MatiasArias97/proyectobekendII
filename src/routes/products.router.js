// routes/products.router.js
import { Router } from 'express';
import passport from 'passport';
import { authorizeRoles } from '../middlewares/role.middleware.js';

import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products.controller.js';

const router = Router();

// Obtener productos
router.get('/', getAllProducts);

// Obtener producto por ID
router.get('/:pid', getProductById);

// Crear producto (solo admin o premium)
router.post(
  '/',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin', 'premium'),
  createProduct
);

// Actualizar producto (solo admin o premium)
router.put(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin', 'premium'),
  updateProduct
);

// Eliminar producto (solo admin o premium)
router.delete(
  '/:pid',
  passport.authenticate('jwt', { session: false }),
  authorizeRoles('admin', 'premium'),
  deleteProduct
);

export default router;

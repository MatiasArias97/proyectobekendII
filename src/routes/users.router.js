// auth.router.js
import { Router } from 'express';
import passport from 'passport';
import SessionController from '../controllers/session.controller.js';
import UserDTO from '../dto/user.dto.js'; // Asegúrate de importar el DTO

const router = Router();
const sessionController = new SessionController();

// Registro
router.post('/register', passport.authenticate('register', { session: false }), (req, res) => {
  res.status(201).json({ message: 'Usuario registrado con éxito' });
});

// Login
router.post('/login', (req, res) => sessionController.login(req, res));

// Perfil actual
router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  // Crear una instancia de UserDTO para enviar solo los datos necesarios
  const userDTO = new UserDTO(req.user);
  res.json({ user: userDTO }); // Devolvemos el DTO con los datos filtrados
});

export default router;

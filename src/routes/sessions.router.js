  import { Router } from 'express';
  import passport from 'passport';
  import { register, login } from '../controllers/user.controller.js';
  import UserDTO from '../dto/user.dto.js';

  const router = Router();

  // Registro de usuarios
  router.post('/register', register);

  // Login con Passport Local
  router.post('/login', passport.authenticate('local', { failureRedirect: '/login-fail', session: false }), login);

  // ✅ Ruta protegida: Perfil actual del usuario
  router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    const userDTO = new UserDTO(req.user);
    res.json({ user: userDTO });
  });

  export default router;

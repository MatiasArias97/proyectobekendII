import express from 'express';
import passport from 'passport';
import { registerUser, loginUser, currentUser } from '../controllers/sessionController.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/current', passport.authenticate('jwt', { session: false }), currentUser);

export default router;
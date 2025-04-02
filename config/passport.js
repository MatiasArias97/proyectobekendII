import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import { UserModel } from '../models/User.js';

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([(req) => req?.cookies?.token]),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    const user = await UserModel.findById(jwt_payload.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
}));
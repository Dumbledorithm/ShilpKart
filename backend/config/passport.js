import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

const configurePassport = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: 'https://shilpkart.onrender.com/api/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            const token = generateToken(user._id);
            done(null, { user, token });
          } else {
            const newUser = await User.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: Math.random().toString(36).slice(-8),
            });
            const token = generateToken(newUser._id);
            done(null, { user: newUser, token });
          }
        } catch (error) {
          done(error, null);
        }
      }
    )
  );
};

export default configurePassport;
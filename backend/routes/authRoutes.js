import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));


router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/login', session: false }),
  (req, res) => {
    // On successful authentication, req.user is populated by Passport.
    // We will redirect the user to the frontend with the token.
    const { user, token } = req.user;
    res.redirect(`http://localhost:5173/login?token=${token}`);
  }
);

export default router;
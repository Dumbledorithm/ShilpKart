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
    const frontendUrl = process.env.FRONTEND_URL
    res.redirect(`${frontendUrl}/login?token=${token}`);
  }
);

export default router;
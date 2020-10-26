const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google',
  passport.authenticate('google', { scope: ['email', 'profile'] }));  // CL ?

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/user/no-permission' }),
  (req, res) => {
    res.redirect('/user/logged'); // CL ?>
  }
);

// http://www.passportjs.org/docs/logout/

router.get('/auth.logout', (req, res) => {
    req.logout();
    res.redirect('/');
    // res.redirect('/');
  });

module.exports = router;
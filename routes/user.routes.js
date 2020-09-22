const express = require('express');
const router = express.Router();

router.get('/logged', (req, res) => {
    if(req.user){
        res.render('logged', { name: req.user.displayName, photos: req.user._json.picture });
      }
      else{res.render('noPermission')};
    });
    
// Only after logging in...
    router.get('/profile', (req, res) => {
      if(req.user){
        res.render('profile');
      }
      else{res.render('noPermission')};
    });
    
// Only after logging in...
    router.get('/profile/settings', (req, res) => {
      if(req.user){
        res.render('settings');
      }
      else{res.render('noPermission')};
});

router.get('/no-permission', (req, res) => {
  res.render('noPermission');
});


module.exports = router;
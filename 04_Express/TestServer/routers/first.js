const express = require('express');
const TextUser = require('../models/TextUser');
const router = express.Router();

router.get('/', (req, res)=>{ 
  if(req.session.loginUser != undefined){
      res.redirect('/login/');
  }else{
      res.render('login', {});
  }
});
module.exports = router;
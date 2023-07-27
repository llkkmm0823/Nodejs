const express = require('express');
const TextUser = require('../models/TextUser');
const router = express.Router();

router.post('/login', async (req, res, next)=>{
  try{
      const loginUser = await TextUser.findOne(
          {
              where:{userid:req.body.userid},
          }
      );
      if( loginUser != null ){
          req.session.loginUser = loginUser;
      } 
      res.json(loginUser);
  }catch(err){
      console.error(err);
      next(err);
  }
});
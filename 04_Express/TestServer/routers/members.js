const express = require('express');
const TextUser = require('../models/TextUser');
const router = express.Router();

const { isNotLoggedIn } = require('./middleware');

router.post('/login',  isNotLoggedIn, async (req, res, next)=>{
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

module.exports = router;

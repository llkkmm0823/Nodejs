const express = require('express');
const Member = require('../models/TestUser');
const router = express.Router();

router.post('/login',  async (req, res, next)=>{
    try{
        const loginUser = await Member.findOne(
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
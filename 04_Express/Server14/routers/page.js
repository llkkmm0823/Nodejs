const express = require('express');
const router = express.Router();

router.get('/', (req,res,next)=>{
    res.render('main', { 
        title : 'NodeGram',
        user : req.user, 
    });
});


router.get('/join', (req, res, next)=>{
    res.render('join', { title: '회원가입 - NodeGram' });
});

module.exports = router;
const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{ 
    if(req.session.loginUser != undefined){
        res.redirect('/loginForm/');
    }else{
        res.render('layout', {});
    }
});

module.exports = router;
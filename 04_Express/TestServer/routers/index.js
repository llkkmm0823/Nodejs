const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{ 
    if(req.session.loginUser != undefined){
        res.redirect('/main/');
    }else{
        res.render('login', {});
    }
});

module.exports = router;
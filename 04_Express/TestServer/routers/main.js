const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    if( req.session.loginUser == undefined ){
        res.redirect('/'); 
    }else{
        const loginUser = req.session.loginUser;
        res.render('main', {loginUser});
    }
});
module.exports = router;
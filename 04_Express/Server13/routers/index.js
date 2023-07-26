const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{ 
    if(req.session.loginUser != undefined){
        res.redirect('/boards/');
    }else{
        // nunjucks 엔진에 의한 render
        res.render('login', {});
    }
});

module.exports = router;
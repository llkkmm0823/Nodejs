const express = require('express');

const router = express.Router();

router.get('/', (req,res)=>{
    // 최초 서버 실행시 첫페이지로   index.html 으로 응답
    res.render('index', {  });   
});

module.exports = router;

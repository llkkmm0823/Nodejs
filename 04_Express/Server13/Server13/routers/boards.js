const express = require('express')
const Board = require('../models/Board');
const router = express.Router();

router.get('/', (req,res)=>{
    const loginUser = req.session.loginUser;
    res.render('main',{loginUser});
});

router.get('/boardList',async(req,res,next)=>{
    try{
        const boardList = await Board.finallAll(
            { order:[['id','DESC']],}  // 게시물 번호로 내림차순 정렬
        );
        res.json( boardList);

    }catch(err){
        console.error(err);
        next(err);
    }
});

module.exports = router;
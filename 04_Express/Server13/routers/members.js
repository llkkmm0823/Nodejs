const express = require('express');
const Member = require('../models/Member');
const router = express.Router();

const { isLoggedIn, isNotLoggedIn } = require('./middleware');

router.post('/login',  isNotLoggedIn, async (req, res, next)=>{
    try{
        const loginUser = await Member.findOne(
            {
                where:{userid:req.body.userid},
            }
        );
        if( loginUser != null ){
            req.session.loginUser = loginUser;
        } // 검색결과가 있고, 비번이 같으면 세션에 검색 결과를 저장합니다
        res.json(loginUser); // 검색결과가 널이든 아니든  클라이언트로 전송합니다.
    }catch(err){
        console.error(err);
        next(err);
    }
});


router.get('/logout' , isLoggedIn, (req, res, next)=>{
    req.session.destroy(function(){ 
        req.session;
    });
    res.redirect('/');
});


router.get('/joinform', isNotLoggedIn, (req,res,next)=>{
    res.render( 'memberInsert', {});
});

// router.get('/', 미들웨어들의 나열)

router.post('/insertMember', isNotLoggedIn, async (req,res,next)=>{
    try{
        const member = await Member.create(
            {
                userid:req.body.userid,
                name:req.body.name,
                pwd:req.body.pwd,
                phone:req.body.phone,
                email:req.body.email,
            }
        );
        // res.json(member);
        res.end();
    }catch(err){
        console.error(err);
        next(err);
    }
});



router.get('/updateForm/:userid', async (req, res, next)=>{
    try{
        const member = await Member.findOne(
            {
                where:{userid:req.params.userid},
            }
        );
        res.render('memberUpdateForm' , {member} );
    }catch(err){
        console.error(err);
        next(err);
    }
});


router.post('/update', async (req, res, next)=>{
    try{
        const result = await Member.update(
            { // 수정내용
                pwd : req.body.pwd,
                name : req.body.name,
                phone : req.body.phone,
                email : req.body.email,
            },
            {   // 수정레코드 검색 조건
                where: { userid : req.body.userid },
            }
        );
        // 수정된 회원을 다시 검색 저장
        const member = await Member.findOne({
            where: { userid : req.body.userid },
        });
        // 저장된 값으로 세션값 갱신
        req.session.loginUser = member;
        res.json(member);
    }catch(err){
        console.error(err);
        next(err);
    }
});


module.exports = router;
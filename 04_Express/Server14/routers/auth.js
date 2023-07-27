const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const passport = require('passport');

const router = express.Router();

// 일반회원 가입
router.post('/join', async (req, res, next)=>{
    //const email = req.body.email;
    //const nick = req.body.nick;
    //const password = req.body.password;
    // req.body 객체 -> { email:'hong1@abc.com', nick:'홍길남', password:'1234' }
    const { email, nick, password } = req.body; 
    try{
        const exUser = await User.findOne(
            {
                where:{ email },
            }
        ); // 전송된 이메일이 이미 회원가입된 이메일인지 확인을 위해 검색
        if( exUser ){
            return res.redirect('/join');
        }  // 이메일이 이미 존재한다면 회원가입 폼으로 되돌아 갑니다.
        
        // password 를 암호화합니다
        const hash = await bcrypt.hash(password, 12);
        // 12 : 해쉬화를 하기위한 복잡도 인수. 숫자가 클수록 해시화 암호화가 복잡해지고 복구시간도 오래걸립니다. 12가 약 1초 정도 시간의 실행을 해줍니다

        await User.create({
            email,
            nick,
            password:hash,
        }); // 사용자를 추가
        return res.redirect('/');   // 첫 메인 페이지로
    }catch(err){
        console.error(err);
        next(err)
    }
});

router.post('/login', (req, res, next)=>{
    //passport모듈로 로그인 구현
    //'local' : 일반 로그인을 하려고 보내는 전달인수
    //()=>{} : 그 때 보내서 실행할 전달인수로서의 익명함수
    //(authErr, user, info)=>{} : 그 때 보내서 실행할 전달인수로서의 익명함수
    //authErr, user, info : authenticate 함수가 실행되면서 그 안에서 전달된 함수를 호출할텐데 그 때 넣어준 값을 받을 매개변수들
    //passport.authenticate('local',(authError, user, info)=>{ }); 
    passport.authenticate(
    'local',
     (authError, user, info)=>{
            //로그인이 성공하면 user에는 현재 로그인한 사람의 정보가 담김
            //로그인중에서 서버에러가 잇다면 서버에러처리됨
            //이때 authenErr에러의 내용이 전달됨
        if(authError){
                console.err(authError);
                return next(authError);
            };
            //로그인하려는 이메일의 주인공이 사용자 목록에 없을 때
        if(!user) { //user가 null or undefined라면 
            return res.redirect(`/?loginError=${info.message}`);
            // '/'첫페이지로 이동하는 url 
            //loginError = ${info.message} 파라미터 같이 전달
        }
        //여기서부터 정상로그인(세션에 사용자 정보를 넣고 첫페이지로 이동)

            return req.login(user,(loginError)={
                if(loginError){ //index.js에서 보낸 에러가 있으면 에러처리
                    console.error(loginError);
                    return next(loginError);
                }  
            //현재 위치에서 세션 쿠키가 브라우저로 보내어짐
           
        });
        return res.redirect('/');
    }
    )(req,res,next)// 미들웨어 내의 미들웨어에는 뒤쪽에 (req, res, next)를 붙임
});


module.exports = router;
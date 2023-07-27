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
    // passport 모듈로 로그인을 구현합니다.
    // 'local' : 일반 로그인을 하려고 보내는 전달인수
    // (authErr, user, info)=>{} : 그때 보내서 실행할 전달인수로서의 익명함수
    // authErr, user, info :  authenticate 함수가 실행되면서 그안에서  전달된 함수를 호출할텐데 그때 넣어준값을 받을 매개변수들
    // passport.authenticate('local' , (authError, user, info)=>{  })(req, res, nex);

    // (authError, user, info)=>{  })(req, res, nex) : 정상로그인되거나, 에러가 있거나, 아이디가 없거나, 비번이 틀리거나 했을때 처리해줄 함수. logcalStrategy.js 에 있는 미들웨어 done으로 전달될 함수입니다.
    passport.authenticate( 
        'local',    // locaStrategy.js 안의 미들웨어를 호출하기위한 키워드
        (authError, user, info)=>{
            // 로그인이 성공하면  user 에는 현재 로그인한 사람의 정보가 담깁니다

            // 로그인 중에서 서버에러가 있다면 서버에러 처리됩니다.
            // 이때 authenErr 에러의 내용이 전달됩니다.
            if (authError) {   
                console.error(authError);
                return next(authError);
            }
            // 로그인하려는 이메일의 주인공이 사용자목록에 없을때
            if (!user) {  // user 가 null or undefined 라면  
                return res.redirect(`/?loginError=${info.message}`);
                //  '/' 첫페이지로 이동하는 url  
                // loginError=${info.message} 파라미터 같이 전달
            }

            // 여기서부터 정상 로그인(세션에 사용자 정보를 넣고 첫페이지로 이동)
            // req안의 login 이라는 멤버함수는 원래는 없는 함수입니다. passport가 설정되면서 req안에 정의되어 추가됩니다.  세션에 로그인 유저를 저장하고 쿠키에s.id 를 저장하는 일을 합니다.
            return req.login( user, (loginError)=>{
                if (loginError) {    // index.js 에서 보낸 에러가 있으면  에러처리
                    console.error(loginError);
                    return next(loginError);
                } 
                // 현재위치에서 세션 쿠키가 브라우져로 보내어집니다
                return res.redirect('/');
            });            
        }
    )(req, res, next); // 미들웨어 내의 미들웨어에는 뒤에(req, res, next)를 붙입니다.
});

router.get('/logout',(req, res) => {
    req.logout();   // 세션 쿠키 삭제
    req.session.destroy();
    res.redirect('/'); 
});

module.exports = router;
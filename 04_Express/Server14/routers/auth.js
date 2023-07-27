const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');

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

module.exports = router;
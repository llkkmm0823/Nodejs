const passport = require('passport');
const local = require('./localStrategy');
const User = require('../models/LoginUser');
const kakao = require('./kakaoStrategy');

module.exports = () => {    
    passport.serializeUser( (user, done) => {   // 정상 로그인이 되었을 때 호출
        done(null, user.id);    // 세션에 로그인되는 사용자의 모든정보가 저장되는 것이 아니라 아이디만 저장되게 하는 동작.
        // 세션에 로그인되는 사용자의 모든정보가 저장되는 것이 아니라 아이디만 저장하도록 req.login 에서 호출하고 전달된 함수가 실행.

        // 이 동작후 세션에 아이디가 저장된다라는건 세션쿠키에도 암호화된 키로 쿠키가 저장된다는 뜻입니다.
        // { id : 3, connect.sid : '14561496165' } 와 같은 세션쿠키가 생성되면서
        // 브라우져에서 connect.sid 값이 쿠키로 관리되고 이 후로는 아래 다시리얼아리즈유저로 아이디가 사용 (세션값으로 목구 및 사용) 됩니다.
    });

    passport.deserializeUser((id, done) => {
        User.findOne({
            where : { id },
            include : [
                {
                model : User,
                attributes : ['id', 'nickname'],
                as : 'Follwers',
                },{
                model : User,
                attributes : ['id', 'nickname'],
                as : 'Followings',
                }
            ],
        })  // id로 조회하고 조회되어 저장된 user 를 req.user 에 저장
        .then((user) => done(null, user))
        .catch((err) => done(err));
        // 세션에 저장된 아이디와 쿠키로 user 를 복구 req.user로 사용
        // req 내장함수 : req.isAuthenticated() 함수 : passport 가 req 에 추가해준 함수, 로그인 되어있는 동안 트루값을 리턴합니다.
    });

    local();
    kakao();
};
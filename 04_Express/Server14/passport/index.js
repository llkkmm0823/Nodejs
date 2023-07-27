const passport = require('passport');
const local = require('./localStrategy');;
const user = require('../models/User');;
//const kakao = require('./kakaoStrategy');;

module.exports=()=>{
    passport.serializeUser((user,done)=>{//정상로그인이 되었을 때
        done(null,user,id); //세션에 아이디만 저장하는 동작
        // 이 동작후 세션에 아이디가 저장된다 라는건 세션 쿠키에도 암호화된 키로 쿠키가 저장된다는 뜻
        //{id:3, 'connect.sid : 14561496165'}와 같은 세션 쿠키가 생성되면서
        //브라우저에서 connect.sid값이 쿠키로 관리되고 이후로는 아래 디시리얼아리즈유저로 아이디가 사용(세션값으로 복구 및 사용)됨

    });
    
    passport.deserializeUser((id,done)=>{
        User.findOne({
            where:{id},
            // include[{
            //     model: User,
            //     attributes : ['id','nick'],
            //     as: Follower
            // }]
        })
        .then(user => done(null,user))
        .catch(err => done(err));
    });
    local();
};



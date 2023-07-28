const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/User');

// 일반 사용자의 로그인 절차를 정의한  strategy

// '/login' 라우터에서 passport.authenticate() 함수가 'local'로 호출되면 
// 아래 export되는 익명함수가 먼저 호출실행되고, 
// 아래 익명함수 어디에선가 passport.authenticate 함수호출시 전달해준 
// (authError, user, info)=>{} 를 done이라는 이름의 변수에 받아서  done이름으로 호출 실행합니다
module.exports=()=>{
    passport.use(
        new LocalStrategy(
            {
                usernameField:'email', // req.body.email 의 필드이름과 일치하게 작성, 'email'
                passwordField:'password', // req.body.password 의 필드이름과 일치하게 작성,
            },async (email, password, done)=>{
                // 로그인위해서 입력한 이메일을 검색하고 있으면 비번까지 비교, 없으면 '없는 아이디입니다'로 처리 - done(null, false, '없는 아이디입니다');
                try{
                    const exUser = await User.findOne(
                        {
                            where:{ email }
                        }
                    );
                    if( exUser ){ // 회원이 존재한다면 
                        // 입력받은 password 를  bcrypt 를 이용해서 비교합니다.
                        const result = await bcrypt.compare(password, exUser.password); 
                        if( result ){   // password도 일치한다면
                            done(null, exUser);  // done(null, exUser, null);
                        }else{  // password 가 일치하지 않을때
                            done(null, false , { message: 'password가 일치하지 않습니다'} );
                        }
                    } else {  // 이메일이 없는 이메일이라면
                        done(null, false , { message: '없는 이메일입니다.'} );
                    }
                }catch(err){
                    console.error(err);
                    done(err);  // 로그인 중간에 서버에러가 났다면
                }
            }
        )
    );
};
//kakaoStrategy.js
const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;
const User =require('../models/User');


module.exports = () => {
    passport.use(
        new KakaoStrategy(
            {
                clientID: process.env.KAKAO_ID,
                callbackURL: '/auth/kakao/callback',
            }, 
            async (accessToken, refreshToken, profile, done)=>{
                console.log('kakao profile', profile);
                try{
                    const exUser = await User.findOne({
                        where : {snsid:profile.id, provider: 'kakao'},
                    }); // 현재 카카오 아이디로 로그인하려는 사람이 기존에 카카오아이디로 회원 가입한 적이 있는 지 조회
                    if(exUser){
                        done(null, exUser); // 아이디가 존재하면 검색결과 회원정보(exUser)를 갖고 바로 done(null, exUser)로 복귀하여, 로그인 절차(세션쿠키에 저장 등) 을 실행합니다
                    }else{
                        const newUser = await User.create({
                            email: profile._json && profile._json.kakao_account.email,
                            nickname: profile.displayName,
                            snsid: profile.id,
                            provider: 'kakao',
                        }); // 회원가입 후... 로그인 절차가 진행
                        console.log(newUser);
                        done(null, newUser);
                    }
                }catch(err){
                    console.error(err);
                    done(err);
                }
            }
        )
    );
};
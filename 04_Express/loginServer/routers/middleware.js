// middleware.js

// 각 라우터들에 중간에 들어갈 미들웨어가 exports 합니다.
exports.isLoggedIn = (req, res, next) => {
    // if( req.session.loginUser != undefined )
    // req.isAuthenticated() 현재 누군가 로그인 되어 있으면 true, 그렇지 않으면 false를 리턴해주는 함수
    if( req.isAuthenticated() ){
        next();
    }else{
        res.send('<h3>로그인이 필요합니다&nbsp;&nbsp;<a href="/">이동</a></h3>');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if( !req.isAuthenticated() ){
        next();
    }else {
        res.send('<h3>로그아웃 후에 사용하세요&nbsp;&nbsp;<a href="/">이동</a></h3>');
    }
}
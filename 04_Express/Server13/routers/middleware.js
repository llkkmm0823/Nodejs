//middleware.js

exports.isLoggedIn = (req,res,next)=>{
    if( req.session.loginUser != undefined ){
        next();     // 로그인이 되어있는 상태라면
    } else {
        //로그인이 안된 상태라면
        res.status(403).send('<h2>로그인이 필요합니다▶▶▶<a href="/">로그인창으로 이동</a></h2>');
        //res.redirect('/'); <-아무메세지 없이 되돌아오도록 하는 코드
    }
};


exports.isNotLoggedIn = (req, res, next) => {
    if (req.session.loginUser != undefined) {
        //로그인이 안된 상태라면
      next();
    } else {
        // 로그인이 되어있는 상태라면
        res.status(403).send('<h2>로그아웃 후에 이용이 가능합니다▶▶▶<a href="/">로그인창으로 이동</a></h2>');

    }
};
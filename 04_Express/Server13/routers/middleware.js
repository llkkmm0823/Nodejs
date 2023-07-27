// middleware.js
exports.isLoggedIn=(req,res,next)=>{
    if( req.session.loginUser != undefined ){
        // 로그인되어 있는 상태라면
        next();
    }else{
        // 로그인이 안된상태라면
        res.status(403).send('<h2>로그인이 필요합니다 &nbsp; <a href="/">로그인창으로 이동</a><h2>');
        // res.redirect('/');
    }
};
exports.isNotLoggedIn=(req,res,next)=>{
    if( req.session.loginUser == undefined ){
        // 로그인이 안되어 있는 상태라면
        next();
    }else{
        // 로그인이 된상태라면
        res.status(403).send('<h2>로그아웃후에 이용할 수 있습니다 &nbsp; <a href="/boards">main 창으로 이동</a><h2>');
        // res.redirect('/boards');
    }
};
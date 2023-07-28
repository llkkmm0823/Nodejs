exports.isLoggedIn=(req,res,next)=>{
    if( req.session.loginUser != undefined ){
        next();
    }else{
        res.status(403).send('<h2>로그인이 필요합니다 &nbsp; <a href="/">로그인창으로 이동</a><h2>');
    }
};
exports.isNotLoggedIn=(req,res,next)=>{
    if( req.session.loginUser == undefined ){
        next();
    }else{
        res.status(403).send('<h2>로그아웃후에 이용할 수 있습니다 &nbsp; <a href="/boards">main 창으로 이동</a><h2>');
    }
};
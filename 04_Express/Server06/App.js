const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
app.set('port', process.env.PORT || 3000);
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());  
app.use(express.urlencoded({extended:true}));  
app.use(session({
    resave:false,
    saveUninitialized:false,
    secret:"abcd123",   // 세션값의 암호화 코드
}));

app.get('/', (req, res)=>{
    if( req.cookies.session ){
        res.send(`${req.session[req.cookies.session]} 님 반갑습니다.` + '<a href="/logout">로그아웃</a>');
    }else{
        res.sendFile(path.join(__dirname, '/index.html'));
    }
});

app.post('/login', (req, res)=>{
    const id = req.body.id;
    const pw = req.body.pw;
    // 세션의 저장
    // req.session.id='hello';
    // req.session.data = 'afdafd';
    // 다른 미들 웨어에서 req.session.data 라는 이름으로 사용가능 (영구적 저장)
    if( id=='scott' && pw=='tiger'){
        const uniqueInt = Date.now();
        req.session[uniqueInt] = id;
        //const expires = new Date();
        //expires.setMinutes(expires.getMinutes() + 1);
        res.cookie('session', uniqueInt, {
            // Expire 를 생략하면  브라우져가 닫힐때 쿠키도 사라집니다
            httpOnly : true,
            path : '/'
        });
        // req.session.userid = id;
        return res.json({msg:'ok'});  
    }else if(id!='scott'){
        return res.json({msg:'없는 아이디입니다'});
    }else if(pw!='tiger'){
        return res.json({msg:'비밀번호가 맞지 않습니다'});
    }else{
        return res.json({msg:'알수없는 이유로 로그인 안됩니다.'});
    }
});


app.get('/logout', (req, res)=>{
    req.session.destroy(
        function(){ 
            req.session;
        }
    );
    res.clearCookie('session', req.cookies.session ,{
        httpOnly : true,
        path : '/'
    });
    res.redirect('/');
});

app.listen(app.get('port'), () => { console.log(app.get('port'), '포트에서 대기중');});
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.set('port', process.env.PORT || 3000);  

app.get('/', (req, res)=>{
    if( req.cookies.id ){
        res.send(`${req.cookies.id} 님 반갑습니다.` + '<a href="/logout">로그아웃</a>');
    }else{
        res.sendFile(path.join(__dirname, '/index.html'));
    }
});

app.post('/login', (req, res)=>{
    const id = req.body.id;
    const pw = req.body.pw;

    if( id=='scott' && pw=='tiger'){  // 정상 로그인
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() + 1);
        res.cookie('id', id, {
            expires : expires,
            httpOnly : true,
            path : '/'
        });
        return res.json({msg:'ok'});  // 서버에서 클라이언트에게 json 데이터를 보냅니다.
    }else if(id != 'scott'){
        return res.json( {msg:'없는 아이디입니다'} );
    }else if(pw != 'tiger'){
        return res.json( {msg:'비밀번호가 맞지 않습니다'} );
    }else{
        return res.json( {msg:'알수없는 이유로 로그인 안됩니다.'} );
    }
});


// 로그아웃 라우터를 만들어주세요
app.get('/logout', (req, res)=>{
    res.clearCookie('id', req.cookies.id, { httpOnly : true, path : '/' } );
    res.redirect('/');
});


app.listen(app.get('port'), () => {  console.log(app.get('port'), '포트에서 서버대기중...'); });
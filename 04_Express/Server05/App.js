const express = require('express');
const path = require('path');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const exp = require('constants');
const app = express();
app.use(morgan('dev'));
app.use(cookieParser());
app.use(express.json()); 
app.use(express.urlencoded({extended:true})); 
app.set('port', process.env.PORT || 3000); 

app.get('/', (req,res)=>{
      if( req.cookies.id){
        res.send(`${req.cookies.id}님 반갑읍니다.` + `<br><a href="/logout">로그아웃</a>` );
    }else{
        res.sendFile(path.join(__dirname,'/index.html'));
    }
});

app.post('/login', (req,res)=>{
    const id = req.body.id;
    const pw = req.body.pw;

    if( id=='scott' && pw=='tiger'){ // 정상 로그인
          const expires = new Date();
          expires.setMinutes(expires.getMinutes() + 1);
          res.cookie(
            'id',
            encodeURIComponent(id),
            {
               expires : expires,
               httpOnly : true,
               path: '/'
          });
          res.json({msg:'ok'}); // 클라이언트에게 json 데이터를 보냄.
    }else if(id!='scott'){
          return res.json({msg:'없는 아이디입니다'});
    }else if(pw!='tiger'){
          return res.json({msg:'비밀번호가 맞지 않습니다.'});
    }else{
          return res.json({msg:'알 수 없는 이유로 로그인이 실패했습니다.'});
    }
});


app.listen(app.get('port'),()=>{console.log(app.get('port'),' 포트에서 서버 대기 중');});
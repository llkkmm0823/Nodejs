const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const app = express();
const dotenv = require('dotenv');  // 추가1

dotenv.config();  // 추가2 // 비밀키 비공개를 위한 기본 환경 구성
app.use( cookieParser( process.env.SESSION_SECRET ) );  // 추가3

app.set('port', process.env.PORT || 3000);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    resave: false,
    saveUninitialized: false,
    //secret: 'nodejsdotenv', // 저장될때 사용하는 암호화키
    secret : process.env.SESSION_SECRET,
}));
app.get('/', (req, res)=>{
    if( req.session.userid ){
        res.send(`${req.session.userid} 님 반갑습니다.` + '<a href="/logout">로그아웃</a>');
    }else{
        res.sendFile(path.join(__dirname, '/login.html'));
    }
});
app.post('/login', (req, res)=>{
    const id = req.body.id;
    const pw = req.body.pw;
    if( id=='scott' && pw=='tiger'){
        req.session.userid = id;
        return res.send('ok'); 
    }else if(id!='scott'){
        return res.send('없는 아이디입니다');
    }else if(pw!='tiger'){
        return res.send('비밀번호가 맞지 않습니다');
    }
});

app.get('/logout', (req, res)=>{
    req.session.destroy(function(){ 
        req.session;
    });
    res.redirect('/');
});


app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기중입니다');
});

//req.app: req 객체를 통해 app 객체에 접근할 수 있습니다. req.app.get('port')와 같은 식으로 사용할 수 있습니다.
//req.body: body-parser 미들웨어가 만드는 요청의 본문을 해석한 객체입니다.
//req.cookies: cookie-parser 미들웨어가 만드는 요청의 쿠키를 해석한 객체입니다.
//req.ip: 요청의 ip 주소가 담겨 있습니다.
//req.params: 라우트 매개변수에 대한 정보가 담긴 객체입니다.
//req.query: 쿼리스트링에 대한 정보가 담긴 객체입니다.
//req.signedCookies: 서명된 쿠키들은 req.cookies 대신 여기에 담겨 있습니다.
//req.get(헤더 이름): 헤더의 값을 가져오고 싶을 때 사용하는 메서드입니다

//res.app: req.app처럼 res 객체를 통해 app 객체에 접근할 수 있습니다.
//res.cookie(키, 값, 옵션): 쿠키를 설정하는 메서드입니다.
//res.clearCookie(키, 값, 옵션): 쿠키를 제거하는 메서드입니다.
//res.end(): 데이터 없이 응답을 보냅니다.
//res.json(JSON): JSON 형식의 응답을 보냅니다.
//res.redirect(주소): 리다이렉트할 주소와 함께 응답을 보냅니다.
//res.render(뷰, 데이터): 다음 단원에서 다룰 템플릿 엔진을 렌더링해서 응답할 때 사용하는 메서드입니다.
//res.send(데이터): 데이터와 함께 응답을 보냅니다. 데이터는 문자열일 수도 있고, HTML일 수도 있으며, 버퍼일 수도 있고 객체나 배열일 수도 있습니다.
//res.sendFile(경로): 경로에 위치한 파일을 응답합니다.
//res.setHeader(헤더, 값): 응답의 헤더를 설정합니다.
//res.status(코드): 응답 시의 HTTP 상태 코드를 지정합니다.
// send sendFile render  json end 등 요청에대한  데이터 전송은 한번에 한개, 그리고 한번만 실행하여야 하며, 하나의 라우터에서 두번 또는 두개가 실행되면 에러가 발생합니다



// 쿠키 옵션들
// maxAge : 쿠키의 수명을 밀리초 단위로 설정
// expires : 만료 날짜를 GMT 시간으로 설정
// path : 해당 디렉토리와 하위 디렉토리에서만 경로가 활성화되고, 웹 브라우저는 해당하는 쿠키만 웹 서버에 전송합니다
// domain : 도메인 네임 default “loaded”
// secure : 웹브라우저와 웹서버가 https로 통신하는 경우만 웹브라우저가 쿠키를 서버로 전송합니다
// httpOnly : 웹 서버를 통해서만 쿠키에 접근할 수 있다. 자바스크립트의 document.cookie를 이용해서 쿠키에 접속하는 것을 막습니다
// signed : 쿠키의 암호화를 결정합니다

// 세션의 옵션들
// secret: 보안을 위한 임의의 문자열(secret key)
// resave: 세션 데이터가 바뀌기 전까지 세션저장소의 값을 저장할 지 여부(default: false)
// saveUninitialized: 세션이 필요하기 전에 세션을 구동할지 여부(default: true)
// store: 세션저장소를 지정

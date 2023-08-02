const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const path = require('path');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const passport = require('passport');
const dateFilter = require('nunjucks-date-filter');
const morgan = require('morgan');

const app = express();  //서버 객체
app.set('port', process.env.PORT || 3000);  //포트변수 설정
dotenv.config();    //.env 파일 사용 설정
app.set('view engine', 'html'); //템플릿 엔진 파일 확장자 설정
let env = nunjucks.configure('views', {express: app, watch: true,});    //템플릿 엔진 폴더 설정
env.addFilter('date', dateFilter);  //날짜 데이터 형식 사용 설정
app.use(morgan('dev')); //서버 클라이언트 요청 응답 표시 설정
app.use(express.static(path.join(__dirname, 'public')));    // 일반 static 폴더 설정
app.use(express.json());    // json 양식 사용설정
app.use(express.urlencoded({extended: false})); // req.body 사용 설정
app.use(cookieParser(process.env.COOKIE_SECRET)); // 쿠키사용
app.use(session({   // 세션 사용
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {   // session-cookie 설정
        httpOnly: true,
        secure: false,
    }
})); 
// 한명의 사용자(클라이언트)에 의해 세션에 한개이상 값이 저장되면 그값을 사용하는 클랑이언트를 구분할수 있는 쿠키가 자동으로 클라이언트에 심어집니다, 그 쿠키에 대한 설정입니다. 
// 세션값이 삭제되거나 브라우저가 닫히면 쿠키값도 사라집니다.
// 수정이 필요하다.

const { sequelize } = require('./models');
sequelize.sync({force:false})
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });


const passportConfig = require('./passport');
passportConfig();

// passport 모듈의 생성은 세션과 연관이 있으므로 그 뒤에 미들웨어를 설정합니다.
app.use(passport.initialize());
app.use(passport.session());

const indexRouter = require('./routers');
const authRouter = require('./routers/auth.js');
app.use('/', indexRouter);
app.use('/auth', authRouter);

app.use((req, res, next)=>{
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
}); //해당 요청에 따른 라우터가 없을때 404에러
app.use((err, req, res, next)=>{
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    console.log(err);
    res.end('error');
    //res.render('error');
}); //그 외 에러들



app.listen(app.get('port'), ()=>{ 
    console.log(app.get('port'), '포트에서 대기 중'); 
});
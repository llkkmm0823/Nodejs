// npm 으로 설치하 모듈들을 서버내로 로딩(require)해서 변수에 저장
const express = require('express');
const nunjucks = require('nunjucks');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// 변수에 저장된 모듈들은 초기설정 등을 실행해서 사용 가능 상태로 설정합니다.
const app = express();
app.set('port', process.env.PORT || 3000);
app.use( express.static(path.join(__dirname, 'public'))); // 스태틱 폴더설정
// app.use('/up', express.static(path.join(__dirname, 'upload'))); // 스태틱 폴더는 두개이상 만들수 있습니다. 그러려면 접근 경로를 서로 다르게 지정해줍니다 '/up'

const dateFilter = require('nunjucks-date-filter'); 
// 넌적스에서 사용할 날짜 양식 필터 사용을 위한 모듈
app.set('view engine', 'html');  // 넌적스 파일 확장자
let env = nunjucks.configure('views', {express: app, watch: true, }); // 넌적스 설정
env.addFilter('date', dateFilter);

app.use(cookieParser());
app.use(session({ resave:false,  saveUninitialized:false,  secret:"rkdgmlwns", }));
app.use(express.json());  // json 데이터 사용 설정
app.use(express.urlencoded({ extended: false }));  // req.body 에 관한 사용 설정

// app.get('/', (req, res)=>{ res.send('<h1>Node.js 에서 제작한 게시판</h1>');});
const indexRouter = require('./routers');
const membersRouter = require('./routers/members');
const mainRouter = require('./routers/main');
app.use('/', indexRouter);
app.use('/members', membersRouter);
app.use('/main', mainRouter);


// 데이터베이스에 대한 설정
const { sequelize } = require('./models');

sequelize.sync({ force:false })
.then(()=>{ console.log('데이터베이스 연결성공');})
.catch((err)=>{ 
    console.error(err);
});


// 서버 운영중 라우팅에러 또는 그 외 에러가 발생하면 이동하여 처리될 에러처리 라우터
// app.use((req, res, next) => {
//     const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
//     error.status = 404;
//     next(error);
// });
// app.use((err, req, res, next) => {
//     res.locals.message = err.message;
//     res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
//     res.status(err.status || 500);
//     console.error(err);
//     res.render('error');
// });
// 서버 포트설정 & 대기시작 명령
app.listen(app.get('port'),()=>{console.log(app.get('port'), ' 포트에서 대기중'); });